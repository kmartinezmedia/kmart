import { fontSizesPx, lineHeightsPx } from "./typography";
import { capitalize } from "../utils";
import omit from "lodash/omit";

// For sketch style guide
const fontFamilyInfo = [
  {
    name: "Europa",
    weights: {
      light: 300,
      regular: 400,
      bold: 700
    }
  },
  {
    name: "Expo Serif Pro",
    weights: {
      light: 300,
      regular: 400,
      semibold: 600,
      bold: 700
    }
  },
  {
    name: "Poppins",
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
      black: 900
    }
  }
];

const flatten = arr => {
  while (arr.find(el => Array.isArray(el)))
    arr = Array.prototype.concat(...arr);
  return arr;
};

// create object with all font styles in every size for style guide
export const sketchFontStyles = flatten(
  Object.keys(fontSizesPx).map(size => {
    return fontFamilyInfo.map(font => {
      return Object.keys(font.weights).map(weight => {
        return {
          fontFamily: font.name,
          fontSize: fontSizesPx[size],
          lineHeight: lineHeightsPx[size],
          fontWeight: font.weights[weight],
          color: "#000000",
          name: `${capitalize(size)}/${font.name}/${capitalize(weight)}`
        };
      });
    });
  })
).reduce((prev, next) => ((prev[next.name] = omit(next, ["name"])), prev), {});
