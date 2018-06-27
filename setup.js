const fs = require("fs");
const path = require("path");
const spacePx = [0, 8, 16, 24, 32, 64, 96, 128, 160, 192];
const spaceNative = [4, 8, 12, 16, 24, 32, 40, 48];
const { startsWith, isNaN } = require("lodash");
const numToWords = require("number-to-words");
const capitalize = require("lodash/capitalize");
const compress_images = require("compress-images");
const shell = require("shelljs");
const { View, Text } = require("react-primitives");

const cleanUtils = `import React from "react";
import Ratio from "react-ratio";
import PropTypes from "prop-types";
import shorthandProps from "../theme/shorthandProps";
import shorthandAttributes from "../theme/shorthandAttributes";

const cleanElement = Component => {
  return class Cleaned extends React.Component {
    render() {
      const next = {};
      const keys = Object.keys(Cleaned.propTypes || {});
      for (let key in this.props) {
        if (keys.includes(key)) continue;
        next[key] = this.props[key];
      }
      return React.createElement(Component, {
        ...next,
        ref: el => (this.el = el)
      });
    }
  };
};

const mixinNames = Object.keys({
  ...shorthandProps,
  ...shorthandAttributes
}).reduce(
  (prev, next) => ({
    ...prev,
    [next]: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool
    ])
  }),
  {}
);`;

const domElements = [
  "div",
  "span",
  "button",
  "a",
  "img",
  "section",
  "article",
  "iframe",
  "input",
  "select",
  "label"
];

const customComponents = ["Ratio"];

const cleanElements = domElements
  .map(el => `export const Clean${capitalize(el)} = cleanElement("${el}");`)
  .join("\n");

const cleanComponents = customComponents
  .map(el => `export const Clean${capitalize(el)} = cleanElement(${el});`)
  .join("\n");

const cleanPropTypes = [...domElements, ...customComponents]
  .map(el => `Clean${capitalize(el)}.propTypes = mixinNames;`)
  .join("\n");

module.exports.generateCleanElements = () =>
  fs.writeFileSync(
    "src/utils/cleanDiv.js",
    cleanUtils +
      "\n\n" +
      cleanElements +
      "\n" +
      cleanComponents +
      "\n\n" +
      cleanPropTypes
  );

const spaceProps = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py"
];

const properties = {
  m: "margin",
  p: "padding"
};

const directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: "Horizontal",
  y: "Vertical"
};

const shorthandProps =
  "export default {\n" +
  spaceProps
    .map(prop =>
      spacePx.map((num, i) => {
        let name;
        if (prop.length === 1) {
          name = properties[prop];
          return `"${prop}${num}": {
            ${name}: rems(${num})
          }`;
        } else {
          const firstWord = properties[prop.split("")[0]];
          const secondWord = prop.split("")[1];
          if (secondWord.includes("x") || secondWord.includes("y")) {
            if (secondWord.includes("x")) {
              return `"${prop}${num}": {
              ${firstWord}Left: rems(${num}),
              ${firstWord}Right: rems(${num})
            }`;
            } else {
              return `"${prop}${num}": {
              ${firstWord}Top: rems(${num}),
              ${firstWord}Bottom: rems(${num})
            }`;
            }
          } else {
            name = `${properties[prop.split("")[0]]}${
              directions[prop.split("")[1]]
            }`;
            return `"${prop}${num}": {
          ${name}: rems(${num})
        }`;
          }
        }
      })
    )
    .join(",\n") +
  "}";

module.exports.generateShorthandSpaceProps = () =>
  fs.writeFileSync(
    "src/theme/spaceProps.js",
    "import { rems } from './utils';\n\n" + shorthandProps
  );

const shorthandPropsNative =
  "export default {\n" +
  spaceProps
    .map(prop =>
      spaceNative.map((num, i) => {
        let name;
        if (prop.length === 1) {
          name = properties[prop];
          return `"${prop}${num}": {
            ${name}Horizontal: PixelRatio.roundToNearestPixel(${num}),
            ${name}Vertical: PixelRatio.roundToNearestPixel(${num})
          }`;
        } else {
          name = `${properties[prop.split("")[0]]}${
            directions[prop.split("")[1]]
          }`;
          return `"${prop}${num}": {
          ${name}: PixelRatio.roundToNearestPixel(${num})
        }`;
        }
      })
    )
    .join(",\n") +
  "}";

module.exports.generateShorthandSpacePropsNative = () =>
  fs.writeFileSync(
    "src/theme/space.js",
    "import { Platform, PixelRatio } from 'react-native';\n\n" +
      shorthandPropsNative
  );

const getFileNames = ({ dir, showExtension }) => {
  const files = fs
    .readdirSync(dir)
    .filter(x => x.includes("."))
    .filter(x => x.split(".")[0] !== "index")
    .filter(x => x.split(".")[1] !== "DS_Store");
  if (showExtension) {
    return files;
  } else {
    return files.map(item => item.split(".")[0]);
  }
};

module.exports.getFileNames = getFileNames;

const generateExportNames = async ({
  files,
  defaults,
  wildcard,
  showExtension,
  requires
}) => {
  const filteredFiles = files
    .filter(file => !startsWith(file, "."))
    .filter(file => !file.includes("index"))
    .filter(file => file !== "");
  const firstLine = requires ? `module.exports = {\n` : "";
  const lastLine = +requires ? "\n}" : "";
  return (
    firstLine +
    filteredFiles
      .map((x, i) => {
        let name = x.split(".")[0];
        let extension = x.split(".")[1];
        let filename;
        const isLast = filteredFiles.length - 1 === i;
        if (extension !== undefined) {
          filename = extension === "js" ? name : x;
        } else {
          filename = x;
        }
        if (!isNaN(parseInt(name))) {
          name = numToWords.toWords(name);
        }
        if (defaults) {
          return `export { default as ${name} } from "./${filename}";`;
        } else if (wildcard) {
          return `export * from "./${filename}";`;
        } else if (requires) {
          return `"${name}": require("./${filename}")${!isLast ? "," : ""}`;
        }
      })
      .join("\n") +
    lastLine
  );
};

async function getContents({
  dir,
  defaults,
  wildcard,
  showExtension,
  requires
}) {
  let fileNames = [];
  await fs.readdirSync(dir).forEach(async item => {
    const contentPath = path.join(dir, item);
    if (fs.statSync(contentPath).isDirectory()) {
      getContents({
        dir: contentPath,
        defaults,
        wildcard,
        showExtension,
        requires
      });
    }
    fileNames.push(item);
  });
  const fileContents = await generateExportNames({
    files: fileNames,
    defaults,
    wildcard,
    requires
  });
  return await fs.writeFileSync(path.join(dir, "index.js"), fileContents);
}

module.exports.generateExports = async ({
  dir,
  defaults = false,
  wildcard = false,
  showExtension = false,
  requires = false
}) => {
  const directoryPath = path.join(process.cwd(), dir);
  await getContents({
    dir: directoryPath,
    defaults,
    wildcard,
    showExtension,
    requires
  });
};

module.exports.generateImports = ({ dir }) => {
  const files = getFileNames(dir);
  return `import {${files.join(", ")}} from "./${dir}"`;
};

module.exports.compressImages = ({ input, output, cb = () => {} }) => {
  const inputDir = path.join(process.cwd(), input);
  const outputDir = path.join(process.cwd(), output);
  console.log(`starting ${input} compression`);
  compress_images(
    `${inputDir}/*.{jpg,JPG,jpeg,JPEG,png,svg}`,
    `${outputDir}/`,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: false, command: false } },
    function() {
      cb();
    }
  );
};

module.exports.convertGifs = ({ input, output }) => {
  const inputDir = path.join(process.cwd(), input);
  const outputDir = path.join(process.cwd(), output);
  fs.readdirSync(inputDir).forEach(item => {
    if (item.includes(".gif")) {
      const prefixName = item.split(".")[0];
      const inputFile = `${inputDir}/${item}`;
      const outputPrefix = `${outputDir}/${prefixName}`;
      const outputMp4 = `${outputPrefix}.mp4`;
      const outputWebm = `${outputPrefix}.webm`;
      shell.exec(`ffmpeg -n -i ${inputFile} -b:v 0 -crf 25 ${outputMp4}`);
      shell.exec(
        `ffmpeg -n -i ${inputFile} -c vp9 -b:v 0 -crf 41 ${outputWebm}`
      );
    }
  });
};
