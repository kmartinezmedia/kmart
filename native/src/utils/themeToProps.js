import capitalize from 'lodash/capitalize';

export const themeToProps = function(
  themeCategory,
  cssProperty,
  hasCustomPrefix = false,
  customPrefix,
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
