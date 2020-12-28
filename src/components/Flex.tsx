import React, { forwardRef } from 'react';

import { getBackground, getFlex, getFlexWrap, getForeground, getSpacing } from '@kmart/css';
import { DefaultComponentProps, HtmlForwardedRef } from '@kmart/types';
import { join } from '@kmart/utils';

export type FlexProps = {
  flexWrap?: Parameters<typeof getFlexWrap>[number];
} & DefaultComponentProps<'div'>;

const createFlex = (className: string, displayName: string) => {
  const FlexComponent = (
    {
      children,
      dangerouslySetClassName,
      color,
      backgroundColor,
      spacing,
      flexWrap,
      ...otherProps
    }: FlexProps,
    ref?: HtmlForwardedRef<'div'>
  ) => (
    <div
      ref={ref}
      className={join(
        className,
        getSpacing(spacing),
        getForeground(color),
        getBackground(backgroundColor),
        getFlexWrap(flexWrap),
        dangerouslySetClassName
      )}
      {...otherProps}
    >
      {children}
    </div>
  );

  FlexComponent.displayName = displayName;
  return forwardRef(FlexComponent);
};

export const HStack = createFlex(getFlex('hStack'), 'HStack');
export const VStack = createFlex(getFlex('vStack'), 'VStack');
