import * as borderWidth from './borderWidth';

export const getBorderWidth = (key?: keyof typeof borderWidth) => {
  if (key) {
    return borderWidth[key];
  }
};
