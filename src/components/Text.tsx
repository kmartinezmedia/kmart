import React, { forwardRef, PropsWithChildren } from 'react';

import {
  getBackground,
  getForeground,
  getHelper,
  getSpacing,
  getTextAlign,
  getTypography,
  Typography,
} from '@kmart/css';
import { DynamicTag, HtmlElement, TextProps } from '@kmart/types';
import { join, pascalCase } from '@kmart/utils';

const createText = (name: Typography) => {
  const isNumber = ['label2', 'caption'].includes(name);
  const baseClass = getTypography(name);

  const TextComponent = <T extends HtmlElement>({
    children,
    backgroundColor,
    color = 'foreground',
    textAlign = 'start',
    nowrap = false,
    dangerouslySetClassName,
    spacing,
    as,
    ...otherProps
  }: PropsWithChildren<TextProps> & DynamicTag<T>) => {
    return React.createElement(
      as,
      {
        ...otherProps,
        className: join(
          getBackground(backgroundColor),
          getForeground(color),
          getTextAlign(textAlign),
          getSpacing(spacing),
          getHelper(nowrap ? 'nowrap' : undefined),
          getHelper(isNumber ? 'tabularNumber' : undefined),
          baseClass,
          dangerouslySetClassName
        ),
      },
      children
    );
  };

  TextComponent.displayName = pascalCase(name);
  return forwardRef(TextComponent);
};

export const Display1 = createText('display1');
export const Display2 = createText('display2');
export const Title1 = createText('title1');
export const Title2 = createText('title2');
export const Title3 = createText('title3');
export const Headline = createText('headline');
export const Body = createText('body');
export const Label1 = createText('label1');
export const Label2 = createText('label2');
export const Caption = createText('caption');
export const Legal = createText('legal');
