import merge from "lodash/merge";
import { default as defaultShorthandProps } from "./theme/shorthandProps";
import { default as defaultShorthandAttributes } from "./theme/shorthandAttributes";
import { fonts, fontSizes, fontWeights, lineHeights } from "./theme/typography";
import { space, spaceNative } from "./theme/space";
import { theme } from "./theme";
import { themeToProps } from "./theme/utils";
import { delay } from "./utils";

export const initThemeProvider = function(props, cb) {
  !Element.prototype.hasOwnProperty("outerHeight") &&
    Object.defineProperty(Element.prototype, "outerHeight", {
      get: function() {
        var height = this.clientHeight;
        var computedStyle = window.getComputedStyle(this);
        height += parseInt(computedStyle.marginTop, 10);
        height += parseInt(computedStyle.marginBottom, 10);
        height += parseInt(computedStyle.borderTopWidth, 10);
        height += parseInt(computedStyle.borderBottomWidth, 10);
        return height;
      }
    });

  // Add element position to prototype
  !Element.prototype.hasOwnProperty("position") &&
    Object.defineProperty(Element.prototype, "position", {
      get: function() {
        const coordinates = this.getBoundingClientRect();
        return { x: coordinates.x, y: coordinates.y };
      }
    });

  // Add element position to prototype
  !Document.prototype.hasOwnProperty("height") &&
    Object.defineProperty(Document.prototype, "height", {
      get: function() {
        return Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
      }
    });

  // Add element position to prototype
  !Document.prototype.hasOwnProperty("width") &&
    Object.defineProperty(Document.prototype, "width", {
      get: function() {
        return Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
      }
    });

  // Add element position to prototype
  !Document.prototype.hasOwnProperty("atTop") &&
    Object.defineProperty(Document.prototype, "atTop", {
      get: function() {
        return window.pageYOffset === 0;
      }
    });

  if (window.requestAnimationFrame == null) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame;
  }

  if (window.requestAnimationFrame == null) {
    window.requestAnimationFrame = async function(f) {
      console.log("animate");
      await delay(1 / 60);
      f();
      return;
    };
  }

  const {
    html = () => {},
    shorthandProps = () => {},
    shorthandAttributes = {},
    ...restOfTheme
  } = props.theme;

  const { native = false } = props;

  const mergedTheme = merge({}, theme, restOfTheme);
  const miscShorthandProps = {
    ...themeToProps(fonts, "fontFamily"),
    ...themeToProps(fontSizes, "fontSize"),
    ...themeToProps(fontWeights, "fontWeight"),
    ...themeToProps(lineHeights, "lineHeight", true, "lh"),
    ...themeToProps(mergedTheme.colors, "backgroundColor", true, "bg"),
    ...themeToProps(mergedTheme.colors, "color", true, "c"),
    ...themeToProps(mergedTheme.colors, "borderColor", true, "bc")
  };

  return merge({}, mergedTheme, {
    html: html(mergedTheme),
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    space: native ? spaceNative : space,
    shorthandProps: {
      ...defaultShorthandProps,
      ...miscShorthandProps,
      ...shorthandProps(mergedTheme)
    },
    shorthandAttributes: {
      ...defaultShorthandAttributes,
      ...shorthandAttributes
    }
  });
};
