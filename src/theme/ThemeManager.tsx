import React, { memo } from 'react';

import { getFlex, getFlexDirection, getScale, getSpectrum } from '@kmart/css';
import { join } from '@kmart/utils';

import { usePalette } from './palette/usePalette';
import { useScale } from './scale/useScale';
import { useSpectrum } from './spectrum/useSpectrum';

type ThemeMangerProps = {
  dangerouslySetClassName?: string;
};

export const ThemeManager: React.FC<ThemeMangerProps> = memo(
  ({ children, dangerouslySetClassName }) => {
    const scale = useScale();
    const spectrum = useSpectrum();
    const palette = usePalette();
    return (
      <div
        className={join(
          getScale(scale),
          getSpectrum(spectrum),
          getFlexDirection('column'),
          getFlex(1),
          dangerouslySetClassName
        )}
        style={palette}
      >
        {children}
      </div>
    );
  }
);

ThemeManager.displayName = 'ThemeManager';
