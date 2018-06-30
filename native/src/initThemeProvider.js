import merge from "lodash/merge";
import { theme } from "./theme";
import { themeToProps } from "@kmart/utils/lib/themeToProps";

export const initThemeProvider = function(props, cb) {
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

  const miscShorthandProps = {
    ...themeToProps(mergedTheme.colors, "backgroundColor", true, "bg"),
    ...themeToProps(mergedTheme.colors, "color", true, "c"),
    ...themeToProps(mergedTheme.colors, "borderColor", true, "bc")
  };

  return merge({}, mergedTheme, {
    shorthandProps: {
      ...miscShorthandProps,
      ...textShorthandsProps
    }
  });
};
