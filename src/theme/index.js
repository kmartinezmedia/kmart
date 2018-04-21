import { colors } from "./colors";
import { breakpoints, devices, responsive } from "./responsive";
import { space, spacePx } from "./space";
import { transitions } from "./transitions";
import { sketchFontStyles } from "./sketchStyleGuide";
import { rems, themeToProps, setupComponent, applyProps } from "./utils";
import { functions } from "./functions";
import shorthandAttributes from "./shorthandAttributes";
import shorthandProps from "./shorthandProps";
import spaceMixins from "./spaceMixins";

import {
  baseScale,
  baseFontSize,
  baseLineHeight,
  fonts,
  fontSizes,
  fontSizesPx,
  fontWeights,
  lineHeights
} from "./typography";

export const theme = {
  ...functions,
  shorthandAttributes,
  shorthandProps: { ...shorthandProps, ...spaceMixins },
  setupComponent,
  applyProps,
  baseScale,
  baseFontSize,
  baseLineHeight,
  fonts,
  fontSizes,
  fontSizesPx,
  fontWeights,
  lineHeights,
  colors,
  breakpoints,
  devices,
  responsive,
  rems,
  space,
  spacePx,
  transitions,
  sketchFontStyles,
  borderRadius: {
    default: "4px",
    circle: "50%"
  },
  maxContainerWidth: "1024px",
  shadows: [`0 1px 2px 10px rgba(0,0,0,0)`, `0 1px 40px 5px rgba(0,0,0,0.1)`]
};
