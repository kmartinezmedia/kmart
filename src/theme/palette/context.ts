import * as React from 'react';

import { PaletteConfigTransformed } from '@kmart/types';

import { defaultPalette } from './defaultPalette';

export const PaletteContext = React.createContext<PaletteConfigTransformed>(defaultPalette);
