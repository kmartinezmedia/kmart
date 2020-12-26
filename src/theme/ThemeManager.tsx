import "./styles/scale.css";
import "./styles/spectrum.css";
import React, { memo } from "react";
import { usePalette } from './palette/usePalette';
import { useScale } from './scale/useScale';
import { useSpectrum } from './spectrum/useSpectrum';
import { join } from '@kmart/utils';

export const ThemeManager: React.FC = memo(({ children }) => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePalette();
  return (
    <div
      className={join(scale, spectrum)}
      style={palette}>
      {children}
    </div>
  );
});

ThemeManager.displayName = 'ThemeManager';
