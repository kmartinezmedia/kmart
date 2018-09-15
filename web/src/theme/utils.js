import capitalize from "lodash/capitalize";

export const baseScale = 8;
export const baseFontSize = baseScale * 2;
export const baseLineHeight = baseFontSize * 1.5;
export const rems = px => `${px / baseFontSize}rem`;
