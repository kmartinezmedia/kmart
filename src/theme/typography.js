import { rems } from "./utils";

export const baseScale = 8;
export const baseFontSize = baseScale * 2;
export const baseLineHeight = baseFontSize * 1.5;

const europa = "'europa', sans-serif";
const expo = "'expo-serif-pro', serif";

export const fonts = {
  europa: europa,
  expo: expo,
  hero: europa,
  h1: europa,
  h2: europa,
  h3: europa,
  h4: europa,
  h5: europa,
  p: europa,
  small: europa
};

export const fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700
};

// font sizes in px
export const fontSizesPx = {
  hero: 88,
  h1: 62,
  h2: 48,
  h3: 32,
  h4: 24,
  h5: 20,
  p: 16,
  small: 14
};

// font sizes in rems
export const fontSizes = {
  hero: rems(fontSizesPx.hero),
  h1: rems(fontSizesPx.h1),
  h2: rems(fontSizesPx.h2),
  h3: rems(fontSizesPx.h3),
  h4: rems(fontSizesPx.h4),
  h5: rems(fontSizesPx.h5),
  p: rems(fontSizesPx.p),
  small: rems(fontSizesPx.small)
};

export const lineHeightsPx = {
  hero: baseScale * 16,
  h1: baseScale * 9,
  h2: baseScale * 8,
  h3: baseScale * 6,
  h4: 40,
  h5: baseScale * 4,
  p: baseScale * 3,
  small: baseScale * 3
};

export const lineHeights = {
  hero: lineHeightsPx.hero / fontSizesPx.hero,
  h1: lineHeightsPx.h1 / fontSizesPx.h1,
  h2: lineHeightsPx.h2 / fontSizesPx.h2,
  h3: lineHeightsPx.h3 / fontSizesPx.h3,
  h4: lineHeightsPx.h4 / fontSizesPx.h4,
  h5: lineHeightsPx.h5 / fontSizesPx.h5,
  p: lineHeightsPx.p / fontSizesPx.p,
  small: lineHeightsPx.small / fontSizesPx.small
};
