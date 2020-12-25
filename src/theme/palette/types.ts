import {
  SpectrumAlias,
  SpectrumAliasWithOpacity,
} from '@kmart/theme/spectrum/types';

import { paletteBackgrounds, paletteForegrounds } from './constants';

export type PaletteForeground = typeof paletteForegrounds[number];
export type PaletteBackground = typeof paletteBackgrounds[number];
export type PaletteAlias = PaletteForeground | PaletteBackground;

type PaletteValue = SpectrumAlias | SpectrumAliasWithOpacity;

export type InternalPaletteConfig = Record<PaletteAlias, PaletteValue>;
export type PaletteConfig = Omit<Partial<InternalPaletteConfig>, 'transparent'>;
export type UsePaletteFn = () => Record<PaletteAlias, string>;
