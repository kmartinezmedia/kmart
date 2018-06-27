import { capitalize } from "../utils/strings";

export const baseScale = 8;
export const baseFontSize = baseScale * 2;
export const baseLineHeight = baseFontSize * 1.5;
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
  const { shorthandAttributes = {} } = props.theme;
  return Object.values(shorthandAttributes)
    .map(style => style(props))
    .reduce((prev, next) => ({ ...prev, ...next }), {});
};

const checkVariations = function({
  theme: { shorthandProps = {} },
  ...propsToCompare
}) {
  // check to see if boolean props are present on component
  // then create style object with all those props merged together
  const styleObject = Object.keys(shorthandProps)
    .filter(key => Object.keys(propsToCompare).includes(key))
    .map(key => {
      return shorthandProps[key];
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
