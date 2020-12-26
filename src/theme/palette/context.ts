import * as React from 'react';

import { defaultPalette } from './defaultPalette';
import { PaletteConfigTransformed } from '@kmart/types';

export const PaletteContext = React.createContext<PaletteConfigTransformed>(defaultPalette);
