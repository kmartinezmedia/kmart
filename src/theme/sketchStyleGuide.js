import { fontSizesPx, lineHeightsPx, fontVariations } from "./typography";
import { capitalize } from "../utils";
import omit from "lodash/omit";

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
