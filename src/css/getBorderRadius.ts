import * as borderRadius from './borderRadius';

export const getBorderRadius = (key?: keyof typeof borderRadius) => {
  if (key) {
    return borderRadius[key];
  }
};
