import { getScale, getSpectrum } from "@kmart/css"

import React, { memo } from "react";
import { join } from '@kmart/utils';

import { usePalette } from './palette/usePalette';
import { useScale } from './scale/useScale';
import { useSpectrum } from './spectrum/useSpectrum';

export const ThemeManager: React.FC = memo(({ children }) => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePalette();
  return (
    <div
      className={join(getScale(scale), getSpectrum(spectrum))}
      style={palette}>
      {children}
    </div>
  );
});

ThemeManager.displayName = 'ThemeManager';
