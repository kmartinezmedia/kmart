import fs from "fs";
import path from "path";
import prettier from "prettier";
import { spacePx } from "./space";

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

const shorthandProps = spaceArray =>
  "export default {\n" +
  spaceProps
    .map(prop =>
      spaceArray.map((num, i) => {
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

export const generateShorthandSpaceProps = ({ dest, spaceArray = spacePx }) =>
  fs.writeFileSync(
    path.join(process.cwd(), dest),
    prettier.format(
      "import { rems } from './utils';\n\n" + shorthandProps(spaceArray)
    )
  );
