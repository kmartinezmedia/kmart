import React, { FunctionComponent, useState } from 'react';

import {
  getBackground,
  getBorderColor,
  getBorderWidth,
  getForeground,
  getSpacing,
} from '@kmart/css';
import { DefaultComponentProps } from '@kmart/types';
import { join } from '@kmart/utils';

export type ButtonProps = DefaultComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'positive' | 'negative';
};

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  spacing,
  dangerouslySetClassName,
  ...otherProps
}) => {
  const [buttonState] = useState<'inactive' | 'focused'>('inactive');
  return (
    <div className={join(getSpacing(spacing))}>
      <button
        type={type}
        className={join(
          getForeground(`${variant}Foreground` as const),
          getBackground(variant),
          getBorderColor(variant),
          getBorderWidth(buttonState),
          getSpacing({ all: 4 }),
          dangerouslySetClassName
        )}
        {...otherProps}
      >
        {children}
      </button>
    </div>
  );
};
