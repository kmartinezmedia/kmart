import {createContext} from 'react';

import { SpectrumMode } from '@kmart/types';

export const DEFAULT_SPECTRUM = 'light';

export const SpectrumContext = createContext<SpectrumMode>(
  DEFAULT_SPECTRUM,
);
