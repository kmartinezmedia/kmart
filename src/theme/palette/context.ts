import * as React from 'react';

import { internalPalette } from './constants';
import { InternalPaletteConfig } from './types';

export const PaletteConfigContext = React.createContext<InternalPaletteConfig>(
  internalPalette,
);
