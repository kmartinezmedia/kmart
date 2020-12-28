import { SpectrumMode } from '@kmart/types';

import * as spectrum from './spectrum';

export const getSpectrum = (key?: SpectrumMode) => {
  if (key) {
    return spectrum[key];
  }
};
