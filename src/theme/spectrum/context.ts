import * as React from 'react';

import { SpectrumMode } from './types';

export const DEFAULT_SPECTRUM = 'light';

export const SpectrumContext = React.createContext<SpectrumMode>(
  DEFAULT_SPECTRUM,
);
