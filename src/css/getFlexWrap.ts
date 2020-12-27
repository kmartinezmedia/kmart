import * as flexWrap from './flexWrap';

export const getFlexWrap = (key?: keyof typeof flexWrap) => {
  if (key) {
    return flexWrap[key];
  }
};
