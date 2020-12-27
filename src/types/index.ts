import { ReadonlyDeep, KebabCase } from 'type-fest';

export type AnyObject = {
  [key: string]: unknown;
};
export type StringKey<T> = T extends string ? T : string;

export type CssVariable<T extends string> = `--${KebabCase<T>}`;
export type CssVariableFn<T extends string> = `var(${CssVariable<T>})`;


export type SpectrumMode = 'dark' | 'light';

export type SpectrumHue =
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'gray'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'red';

export type SpectrumHueStep =
  | '0'
  | '5'
  | '10'
  | '15'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | '100';

export type SpectrumAlias = `${SpectrumHue}${SpectrumHueStep}`;

export type SpectrumAliasWithOpacity = [SpectrumAlias, number];

export type SpectrumMap = Record<SpectrumAlias, [number, number, number]>;

export type PaletteForeground =
  | 'foreground'
  | 'foregroundMuted'
  | 'primary'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'positive'
  | 'positiveForeground'
  | 'negative'
  | 'negativeForeground';

export type PaletteBackground =
  | 'background'
  | 'backgroundAlternate'
  | 'backgroundOverlay'
  | 'divider'
  | 'stroke'
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative';

export type PaletteAlias = PaletteForeground | PaletteBackground;

export type PaletteConfig = ReadonlyDeep<
  Record<PaletteAlias, SpectrumAlias | SpectrumAliasWithOpacity>
>;

export type PaletteConfigTransformed =  Record<CssVariable<PaletteAlias>, string>

export type Scale = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';

type SpacingDirection = 'top' | 'bottom' | 'left' | 'right' | 'all' | 'horizontal' | 'vertical';
type SpacingStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type SpacingParams = {
  [key in SpacingDirection]?: SpacingStep;
};


export type HtmlElement = keyof JSX.IntrinsicElements;
export type DefaultComponentProps<T extends HtmlElement> = Omit<
  React.ComponentProps<T>,
  'style' | 'className'
> & {
  /**
   * **DANGER** This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
  color?: PaletteForeground;
  backgroundColor?: PaletteBackground;
  spacing?: SpacingParams;
  as?: HtmlElement;
};