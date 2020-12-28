import React from 'react';

import { PaletteConfigTransformed, Scale, SpectrumMode } from '@kmart/types';

import { PaletteProvider } from './palette/PaletteProvider';
import { ScaleProvider } from './scale/ScaleProvider';
import { SpectrumProvider } from './spectrum/SpectrumProvider';
import { ThemeManager } from './ThemeManager';

type ThemeProviderProps = {
  scale?: Scale;
  spectrum?: SpectrumMode;
  palette?: PaletteConfigTransformed;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = React.memo(
  ({ scale, spectrum, palette, children }) => {
    return (
      <ScaleProvider value={scale}>
        <SpectrumProvider value={spectrum}>
          <PaletteProvider value={palette}>
            <ThemeManager>{children}</ThemeManager>
          </PaletteProvider>
        </SpectrumProvider>
      </ScaleProvider>
    );
  }
);

ThemeProvider.displayName = 'ThemeProvider';
