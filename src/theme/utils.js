import { baseFontSize } from "./typography";
import { capitalize } from "../utils/strings";

export const rems = px => `${px / baseFontSize}rem`;

export const themeToProps = function(
  themeCategory,
  cssProperty,
  hasCustomPrefix = false,
  customPrefix
) {
  const styles = {};
  Object.keys(themeCategory).forEach(key => {
    let name;
    if (hasCustomPrefix) {
      name = `${customPrefix}${capitalize(key)}`;
    } else {
      name = key;
    }
    return (styles[name] = { [cssProperty]: themeCategory[key] });
  });
  return styles;
};

const checkAttrs = function(props) {
  return Object.values(props.theme.shorthandAttributes)
    .map(style => style(props))
    .reduce((prev, next) => ({ ...prev, ...next }), {});
};

const checkVariations = function(
  props,
  propsToCompare = props.theme.shorthandProps
) {
  // check to see if boolean props are present on component
  // then create style object with all those props merged together
  const styleObject = Object.keys(propsToCompare)
    .filter(key => Object.keys(props).includes(key))
    .map(key => {
      return propsToCompare[key];
    })
    .reduce((prev, next) => ({ ...prev, ...next }), {});
  return styleObject;
};

export const applyProps = (props, arrayOfShorthands) => {
  const shorthands = props.theme.shorthandProps;
  const styleObject = Object.keys(shorthands)
    .filter(keyName => arrayOfShorthands.includes(keyName))
    .map(key => {
      return shorthands[key];
    })
    .reduce((prev, next) => ({ ...prev, ...next }), {});
  return styleObject;
};

export const setupComponent = function(props) {
  return {
    ...checkAttrs(props),
    ...checkVariations(props)
  };
};
