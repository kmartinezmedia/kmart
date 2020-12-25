import * as React from 'react';

import { internalPalette } from './constants';
import { PaletteConfigContext } from './context';

export const usePaletteConfig = () => {
  const context = React.useContext(PaletteConfigContext);
  if (!context) {
    return internalPalette;
  }
  return context;
};
