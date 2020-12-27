import { entries } from '@kmart/utils';

import * as spacing from './spacing';

type SpacingDirection = 'top' | 'bottom' | 'left' | 'right' | 'all' | 'horizontal' | 'vertical';
type SpacingStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type SpacingParams = {
  [key in SpacingDirection]?: SpacingStep;
};

export const getSpacing = (params?: SpacingParams) => {
  if (params) {
    return entries(params)
      .map(([key, value]) => {
        if (typeof value === 'number') {
          const absValue = Math.abs(value);
          if (value >= 0) {
            const lookup = `${key}${value}` as const;
            if (lookup in spacing) {
              return spacing[lookup];
            }
          }
        }
      })
      .filter(Boolean)
      .join(' ');
  }
};
