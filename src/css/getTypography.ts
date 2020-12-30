import * as typography from './typography';

export type Typography = keyof typeof typography;
export const getTypography = (key?: Typography) => {
  if (key) {
    return typography[key];
  }
  return '';
};
