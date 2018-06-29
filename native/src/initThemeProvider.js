import merge from "lodash/merge";
import { theme } from "./theme";
import { themeToProps } from "@kmart/utils/lib/themeToProps";

export const initThemeProvider = function(props, cb) {
  const {
    shorthandProps = () => {},
    shorthandAttributes = {},
    ...restOfTheme
  } = props.theme;

  const mergedTheme = merge({}, theme, restOfTheme);
  const miscShorthandProps = {
    ...themeToProps(mergedTheme.fonts, "fontFamily"),
    ...themeToProps(mergedTheme.fontSizes, "fontSize"),
    ...themeToProps(mergedTheme.lineHeights, "lineHeight", true, "lh"),
    ...themeToProps(mergedTheme.colors, "backgroundColor", true, "bg"),
    ...themeToProps(mergedTheme.colors, "color", true, "c"),
    ...themeToProps(mergedTheme.colors, "borderColor", true, "bc")
  };

  return merge({}, mergedTheme, {
    shorthandProps: {
      ...miscShorthandProps,
      ...shorthandProps(mergedTheme)
    },
    shorthandAttributes
  });
};
