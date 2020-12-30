import { ExtractCssValues } from '@kmart/types';

import * as flexDirection from './flexDirection';

export type FlexDirection = ExtractCssValues<'flexDirection', keyof typeof flexDirection>;

export const getFlexDirection = (key?: FlexDirection) => {
  if (key) {
    return flexDirection[key];
  }
};
