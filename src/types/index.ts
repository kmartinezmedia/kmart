import { ComponentPropsWithRef } from 'react';
import * as CSS from 'csstype';
import { CamelCase, KebabCase, ReadonlyDeep } from 'type-fest';

export type AnyObject = {
  [key: string]: unknown;
};

/* STRING */
export type StringKey<T> = T extends string ? T : string;
export type CssVariable<T extends string> = `--${KebabCase<T>}`;
export type CssVariableFn<T extends string> = `var(${CssVariable<T>})`;

/* SPECTRUM */
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

/* PALETTE */
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
export type PaletteConfigTransformed = Record<CssVariable<PaletteAlias>, string>;

/* SCALE/SPACING */
export type Scale = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
type SpacingDirection = 'top' | 'bottom' | 'left' | 'right' | 'all' | 'horizontal' | 'vertical';
type SpacingStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type SpacingParams = {
  [key in SpacingDirection]?: SpacingStep;
};

/* COMPONENTS */
export type HtmlElement = keyof JSX.IntrinsicElements;

export interface DefaultWebProps {
  /**
   * **DANGER** This is a last resort escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
}

export interface DefaultNativeProps {
  /**
   * **DANGER** This is a last resort escape hatch. It is not intended to be used normally.
   */
  dangerouslySetStyle?: any;
}

/* Utility CSS properties */
export interface TextAlignProps {
  /**
   * Specify text horizontal alignment.
   *
   * @default 'start'
   */
  textAlign?: 'start' | 'center' | 'end' | 'justify';
}

export interface ColorProps {
  color?: PaletteForeground;
}

export interface BackgroundColorProps {
  backgroundColor?: PaletteBackground;
}

export interface WrapTextProps {
  /**
   * White-space will be set to nowrap if set to true
   *
   * @default false
   */
  nowrap?: boolean;
}

export interface NumberTextProps {
  /**
   * Show numbers in monospace tabular style. It defaults to true for label2 and caption and false
   * in the other typographies.
   */
  isNumber?: boolean;
}

export interface SpacingProps {
  spacing?: SpacingParams;
}

export type DynamicTag<T extends HtmlElement> = {
  as: T;
} & ComponentPropsWithRef<T>;

export interface TextProps
  extends DefaultWebProps,
    ColorProps,
    BackgroundColorProps,
    TextAlignProps,
    WrapTextProps,
    NumberTextProps,
    SpacingProps {}

/* CSS STYLE OVERRIDES */
declare module 'csstype' {
  type CssVariables = { [key in CssVariable<PaletteAlias>]?: string };
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Properties extends CssVariables {}
}

export type ExtractCssValues<T extends keyof CSS.Properties, Filter extends string> = Extract<
  CamelCase<CSS.Properties[T]>,
  Filter
>;
