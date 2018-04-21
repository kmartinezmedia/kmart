const fs = require("fs");
const spacePx = [0, 8, 16, 24, 32, 64, 96, 128, 160, 192];

const getFileNames = (dir, extension = false) => {
  const files = fs
    .readdirSync(`src/${dir}`)
    .filter(x => x.split(".")[0] !== "index")
    .filter(x => x.split(".")[1] !== "DS_Store");
  if (extension) {
    return files;
  } else {
    return files.map(item => item.split(".")[0]);
  }
};

module.exports.getFileNames = getFileNames;

module.exports.generateExports = ({
  dir,
  defaults = false,
  wildcard = false,
  write = true
}) => {
  const files = getFileNames(dir, true);
  const exportedFiles =
    "" +
    files
      .map(x => {
        if (defaults) {
          return `export { default as ${x.split(".")[0]} } from "./${
            x.split(".")[1] === "js" ? x.split(".")[0] : x
          }";`;
        } else if (wildcard) {
          return `export * from "./${
            x.split(".")[1] === "js" ? x.split(".")[0] : x
          }";`;
        }
      })
      .join("\n");
  ("");

  if (write) {
    return fs.writeFileSync(`src/${dir}/index.js`, exportedFiles);
  } else {
    return { files, exportedFiles };
  }
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
