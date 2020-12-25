import * as React from 'react';
import { mapValues, toCssVarFn } from '@kmart/utils';

import { UsePaletteFn } from './types';
import { usePaletteConfig } from './usePaletteConfig';

export const usePalette: UsePaletteFn = () => {
  const paletteConfig = usePaletteConfig();
  return React.useMemo(() => {
    return mapValues(paletteConfig, (spectrumAlias) => {
      const [alias, opacity] =
        typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
      const cssVariable = toCssVarFn(alias);
      if (opacity) {
        return `rgba(${cssVariable},${opacity})` as const;
      } else {
        return `rgb(${cssVariable})` as const;
      }
    });
  }, [paletteConfig]);
};
