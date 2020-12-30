import { ExtractCssValues } from '@kmart/types';

import * as flexWrap from './flexWrap';

export interface FlexWrapProps {
  flexWrap?: ExtractCssValues<'flexWrap', keyof typeof flexWrap>;
}

export const getFlexWrap = (key?: FlexWrapProps['flexWrap']) => {
  if (key) {
    return flexWrap[key];
  }
};
