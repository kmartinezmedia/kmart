import React, { forwardRef, PropsWithChildren } from 'react';

import {
  FlexWrapProps,
  getBackground,
  getFlexDirection,
  getFlexWrap,
  getForeground,
  getSpacing,
} from '@kmart/css';
import {
  BackgroundColorProps,
  ColorProps,
  DefaultWebProps,
  DynamicTag,
  HtmlElement,
  SpacingProps,
} from '@kmart/types';
import { join, kebabCase } from '@kmart/utils';

const flexMap = {
  hStack: 'row',
  vStack: 'column',
} as const;

export interface FlexProps
  extends DefaultWebProps,
    SpacingProps,
    FlexWrapProps,
    BackgroundColorProps,
    ColorProps {
  reverse?: boolean;
}

const createFlex = (name: 'hStack' | 'vStack') => {
  const baseClass = getFlexDirection(flexMap[name]);

  const FlexComponent = forwardRef(
    <T extends HtmlElement>(
      {
        children,
        dangerouslySetClassName,
        color,
        backgroundColor,
        spacing,
        flexWrap,
        reverse,
        as = 'div' as T,
        ...otherProps
      }: PropsWithChildren<FlexProps> & DynamicTag<T>,
      ref: React.Ref<T>
    ) =>
      React.createElement(
        as,
        {
          ...otherProps,
          ref,
          className: join(
            baseClass,
            getFlexDirection(reverse ? (`${flexMap[name]}Reverse` as const) : undefined),
            getSpacing(spacing),
            getForeground(color),
            getBackground(backgroundColor),
            getFlexWrap(flexWrap),
            dangerouslySetClassName
          ),
        },
        children
      )
  );

  FlexComponent.displayName = kebabCase(name);
  return FlexComponent;
};

export const HStack = createFlex('hStack');
export const VStack = createFlex('vStack');
