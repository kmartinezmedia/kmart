import { PaletteBackground } from '@kmart/types';
import * as backgroundColor from './backgroundColor';

export const getBackgroundColor = (key?: PaletteBackground) => {
  if (key) {
    return backgroundColor[key];
  }
};
