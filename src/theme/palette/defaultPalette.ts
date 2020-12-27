import createPalette from '@kmart/palette.macro';

export const defaultPalette = createPalette({
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
});
