import * as React from 'react';
import { usePalette } from './palette/usePalette.web';
import { useScale } from './scale/useScale';
import { useSpectrum } from './spectrum/useSpectrum';
import * as scaleCss from './styles/scale.web';
import * as spectrumCss from './styles/spectrum.web';
import { mapKeys, toCssVar } from '@kmart/utils';
import { join } from '@kmart/utils';

export const ThemeManager: React.FC = React.memo(({ children }) => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePalette();
  const paletteVars = React.useMemo(
    () => mapKeys(palette, (_, key) => toCssVar(key)),
    [palette],
  );

  return (
    <div
      className={join(scaleCss[scale], spectrumCss[spectrum])}
      style={paletteVars}>
      {children}
    </div>
  );
});

ThemeManager.displayName = 'ThemeManager';
