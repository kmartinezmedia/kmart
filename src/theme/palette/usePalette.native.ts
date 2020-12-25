import * as React from 'react';
import { usePaletteConfig } from '@kmart/theme/palette/usePaletteConfig';
import { useSpectrum } from '@kmart/theme/spectrum/useSpectrum';
import * as spectrum from '@kmart/theme/styles/spectrum.native';
import { mapValues } from '@kmart/utils';

import { UsePaletteFn } from './types';

export const usePalette: UsePaletteFn = () => {
  const context = usePaletteConfig();
  const spectrumMode = useSpectrum();
  const spectrumColors = spectrum[spectrumMode];

  return React.useMemo(() => {
    return mapValues(context, (spectrumAlias) => {
      const [alias, opacity = 1] =
        typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
      const spectrumValue = spectrumColors[alias];
      return `rgba(${[...spectrumValue, opacity].join(',')})`;
    });
  }, [context, spectrumColors]);
};
