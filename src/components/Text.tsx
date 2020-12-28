import React, { forwardRef } from 'react';

import { getBackground, getForeground, getTextAlign, getSpacing, getTypography, getHelper } from '@kmart/css';
import { DefaultComponentProps, HtmlForwardedRef } from '@kmart/types';
import { join } from "@kmart/utils"

export type TextProps = {
  /**
   * Specify text horizontal alignment.
   *
   * @default 'start'
   */
  textAlign?: Parameters<typeof getTextAlign>[number];
  /**
   * Text will not wrap if true. Text wraps by default.
   *
   * @default false
   */
  noWrap?: boolean;
  /**
   * Show numbers in monospace tabular style. It defaults to true for label2 and caption and false
   * in the other typographies.
   */
  isNumber?: boolean;
} & DefaultComponentProps<'p'>;

const createText = (className: string, displayName: string) => {
  const isNumber = ['Label2', 'Caption'].includes(displayName);
  const TextComponent = ({ 
    children,
    backgroundColor,
    color = 'foreground',
    textAlign = 'start',
    noWrap = false,
    as: Tag = 'p',
    dangerouslySetClassName,
    spacing,
    ...otherProps
   }: TextProps, ref?: HtmlForwardedRef<'p'>) => {
    return (
      <p ref={ref}
        {...otherProps}
        className={join(
          getBackground(backgroundColor),
          getForeground(color),
          getTextAlign(textAlign),
          getSpacing(spacing),
          getHelper(noWrap ? 'noLineWrap' : undefined),
          getHelper(isNumber ? 'tabularNumber' : undefined),
          className,
          dangerouslySetClassName
        )}>
          {children}
        </p>
    );
  };

  TextComponent.displayName = displayName;
  return forwardRef(TextComponent);
};

export const Display1 = createText(getTypography('display1'), 'Display1');
export const Display2 = createText(getTypography('display2'), 'Display2');
export const Title1 = createText(getTypography('title1'), 'Title1');
export const Title2 = createText(getTypography('title2'), 'Title2');
export const Title3 = createText(getTypography('title3'), 'Title3');
export const Headline = createText(getTypography('headline'), 'Headline');
export const Body = createText(getTypography('body'), 'Body');
export const Label1 = createText(getTypography('label1'), 'Label1');
export const Label2 = createText(getTypography('label2'), 'Label2');
export const Caption = createText(getTypography('caption'), 'Caption');
export const Legal = createText(getTypography('legal'), 'Legal');
