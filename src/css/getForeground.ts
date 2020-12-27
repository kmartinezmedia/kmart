import { PaletteForeground } from '@kmart/types';
import * as color from './foreground';

export const getForeground = (key?: PaletteForeground) => {
  if (key) {
    return color[key];
  }
};
