import { InternalPaletteConfig } from './types';

export const paletteForegrounds = [
  /** Configurable */
  'foreground',
  'foregroundMuted',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'positive',
  'positiveForeground',
  'negative',
  'negativeForeground',
] as const;

export const paletteBackgrounds = [
  /** Configurable */
  'background',
  'backgroundAlternate',
  'backgroundOverlay',
  'divider',
  'stroke',
  'primary',
  'secondary',
  'positive',
  'negative',
  /** Non-configurable */
  'transparent',
] as const;

export const paletteAliases = [...paletteForegrounds, ...paletteBackgrounds];

export const internalPalette: InternalPaletteConfig = {
  /** Configurable options */
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['blue90', 0.33],
  divider: ['gray60', 0.33],
  stroke: ['gray60', 0.66],
  primary: 'blue60',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray0',
  secondaryForeground: 'gray100',
  /**
   * Non-configurable options. Update PaletteConfig in theme/palette/types
   * to exclude any options which a user cannot customize.
   * */
  transparent: ['gray0', 0],
};
