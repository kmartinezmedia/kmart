import * as typography from './typography';

export const getTypography = (key?: keyof typeof typography) => {
  if (key) {
    return typography[key];
  }
  return '';
};
