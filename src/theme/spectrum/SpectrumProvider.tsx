import * as React from 'react';
import { SpectrumContext } from '@kmart/theme/spectrum/context';
import { SpectrumMode } from '@kmart/theme/spectrum/types';
import { useSpectrum } from '@kmart/theme/spectrum/useSpectrum';

type SpectrumProviderProps = {
  value?: SpectrumMode;
};

export const SpectrumProvider: React.FC<SpectrumProviderProps> = React.memo(
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
