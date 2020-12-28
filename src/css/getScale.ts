import { Scale } from '@kmart/types';

import * as scale from './scale';

export const getScale = (key?: Scale) => {
  if (key) {
    return scale[key];
  }
};
