import * as flex from './flex';

export const getFlex = (key?: keyof typeof flex) => {
  if (key) {
    return flex[key];
  }
  
  return '';
};
