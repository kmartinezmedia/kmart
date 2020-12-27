import { entries } from '@kmart/utils';
import { SpacingParams } from "@kmart/types";

import * as spacing from './spacing';

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
