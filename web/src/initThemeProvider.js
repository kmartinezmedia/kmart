import merge from "lodash/merge";
import { theme } from "./theme";
import { themeToProps } from "./theme/utils";
import { delay } from "./utils";

export const initThemeProvider = function(props, cb) {
  !Element.prototype.hasOwnProperty("isInViewport") &&
    Object.defineProperty(Element.prototype, "isInViewport", {
      get: function() {
        var rect = this.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }
    });

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
    shorthandProps = () => {},
    shorthandAttributes = {},
    ...restOfTheme
  } = props.theme;

  const mergedTheme = merge({}, theme, restOfTheme);
  const miscShorthandProps = {
    ...themeToProps(mergedTheme.fonts, "fontFamily"),
    ...themeToProps(mergedTheme.fontSizes, "fontSize"),
    ...themeToProps(mergedTheme.fontWeights, "fontWeight"),
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
