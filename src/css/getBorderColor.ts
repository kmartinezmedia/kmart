import { PaletteBackground } from '@kmart/types';
import * as borderColor from './borderColor';

export const getBorderColor = (key?: PaletteBackground) => {
  if (key) {
    return borderColor[key];
  }
};
