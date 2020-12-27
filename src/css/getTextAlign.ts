import * as textAlign from './textAlign';

export const getTextAlign = (key?: keyof typeof textAlign) => {
  if (key) {
    return textAlign[key];
  }
};
