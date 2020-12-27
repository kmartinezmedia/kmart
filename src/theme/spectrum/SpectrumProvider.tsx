import React, {memo} from 'react';
import { SpectrumMode } from '@kmart/types';
import { SpectrumContext } from './context';
import { useSpectrum } from './useSpectrum';

type SpectrumProviderProps = {
  value?: SpectrumMode;
};

export const SpectrumProvider: React.FC<SpectrumProviderProps> = memo(
  ({ value, children }) => {
    const spectrum = useSpectrum();
    return (
      <SpectrumContext.Provider value={value ?? spectrum}>
        {children}
      </SpectrumContext.Provider>
    );
  },
);

SpectrumProvider.displayName = 'SpectrumProvider';
