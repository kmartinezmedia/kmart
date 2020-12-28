import * as helpers from './helpers';

export const getHelper = (key?: keyof typeof helpers) => {
  if (key) {
    return helpers[key];
  }
};
