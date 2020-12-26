import React, { useMemo, memo } from 'react';

import { emptyObject } from '@kmart/utils';

import { PaletteContext } from './context';
import { PaletteConfigTransformed } from '@kmart/types';
import { usePalette } from './usePalette';

export type PaletteProviderProps = {
  value?: Partial<PaletteConfigTransformed>
};

export const PaletteProvider: React.FC<PaletteProviderProps> = memo(
  ({ value = emptyObject, children }) => {
    const palette = usePalette();
    const memoizedPalette = useMemo(() => ({ ...palette, ...value }), [palette, value]);

    return <PaletteContext.Provider value={memoizedPalette}>{children}</PaletteContext.Provider>;
  }
);

PaletteProvider.displayName = 'PaletteProvider';
