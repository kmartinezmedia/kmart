import { theme } from "@kmart/web";
import capitalize from "lodash/capitalize";
import omit from "lodash/omit";

const { fontSizesPx, lineHeightsPx } = theme;

// For sketch style guide
export const fontVariations = [
  {
    name: "Europa",
    familyProp: "europa",
    weights: {
      light: 300,
      regular: 400,
      bold: 700
    }
  },
  {
    name: "Expo Serif Pro",
    familyProp: "expo",
    weights: {
      light: 300,
      regular: 400,
      semibold: 600,
      bold: 700
    }
  },
  {
    name: "Poppins",
    familyProp: "poppins",
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
export default flatten(
  Object.keys(fontSizesPx).map(size => {
    return fontVariations.map(font => {
      return Object.keys(font.weights).map(weight => {
        return {
          familyProp: font.familyProp,
          fontFamily: font.name,
          fontSize: fontSizesPx[size],
          sizeProp: size,
          lineHeight: lineHeightsPx[size],
          fontWeight: font.weights[weight],
          color: "#000000",
          name: `${capitalize(size)}/${font.name}/${capitalize(weight)}`
        };
      });
    });
  })
).reduce((prev, next) => ((prev[next.name] = omit(next, ["name"])), prev), {});
