import fs from "fs";
import path from "path";
import prettier from "prettier";
import { spaceNative } from "./space";

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

export const generateShorthandSpacePropsNative = ({
  dest,
  spaceArray = spaceNative
}) =>
  fs.writeFileSync(
    path.join(process.cwd(), dest),
    prettier.format(
      "import { PixelRatio } from 'react-native';\n\n" +
        shorthandProps(spaceArray)
    )
  );
