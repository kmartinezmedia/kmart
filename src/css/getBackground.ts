import { PaletteBackground } from '@kmart/types';

import * as backgroundColor from './backgroundColor';

export const getBackground = (key?: PaletteBackground) => {
  if (key) {
    return backgroundColor[key];
  }
};
