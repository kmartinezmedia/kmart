const fs = require("fs");
const path = require("path");
const spacePx = [0, 8, 16, 24, 32, 64, 96, 128, 160, 192];
const { startsWith, isNaN } = require("lodash");
const numToWords = require("number-to-words");

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
  const firstLine = requires ? `module.exports = {` : "";
  const lastLine = +requires ? "}" : "";
  return (
    firstLine +
    filteredFiles
      .map(x => {
        let name = x.split(".")[0];
        let extension = x.split(".")[1];
        let filename;
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
          return `${name}: require("./${filename}"),`;
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
  write = true,
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

module.exports.generateMixins = () =>
  fs.writeFileSync(
    "src/theme/spaceMixins.js",
    "import { rems } from './utils';\n\n" + shorthandProps
  );
