import * as React from 'react';
import { DEFAULT_SPECTRUM, SpectrumContext } from '@kmart/theme/spectrum/context';

export const useSpectrum = () => {
  const context = React.useContext(SpectrumContext);
  if (!context) {
    return DEFAULT_SPECTRUM;
  }
  return context;
};
