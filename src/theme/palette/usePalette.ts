import * as React from 'react';

import { PaletteContext } from './context';
import { defaultPalette } from './defaultPalette';

export const usePalette = () => {
  const context = React.useContext(PaletteContext);
  if (!context) {
    return defaultPalette;
  }
  return context;
};
