import { camelCase } from '@kmart/utils';

import * as flex from './flex';

export const getFlex = (key?: 1 | 2 | 3 | 'auto') => {
  if (key) {
    const stringKey = `flex-${key}` as const;
    const transformedKey = camelCase(stringKey);
    return flex[transformedKey];
  }
};
