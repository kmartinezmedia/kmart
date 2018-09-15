import merge from "lodash/merge";
import { theme } from "./theme";
import { themeToProps } from "@kmart/utils/lib/themeToProps";

export const initThemeProvider = function(props) {
  const mergedTheme = merge({}, theme, props.theme);

  const textShorthandsProps = Object.keys(mergedTheme.fontSizes).reduce(
    (prev, next) => {
      return {
        ...prev,
        [next]: {
          fontSize: mergedTheme.fontSizes[next],
          lineHeight: mergedTheme.lineHeights[next]
        }
      };
    },
    {}
  );

  const { shorthandProps = () => {} } = props.theme;

  const miscShorthandProps = {
    ...themeToProps(mergedTheme.fonts, "fontFamily"),
    ...themeToProps(mergedTheme.colors, "backgroundColor", true, "bg"),
    ...themeToProps(mergedTheme.colors, "color"),
    ...themeToProps(mergedTheme.colors, "borderColor", true, "bc")
  };

  return merge({}, mergedTheme, {
    shorthandProps: {
      ...theme.shorthandProps,
      ...miscShorthandProps,
      ...textShorthandsProps,
      ...shorthandProps(mergedTheme)
    }
  });
};
