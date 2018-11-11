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
    ...checkVariations(props),
  };
};
