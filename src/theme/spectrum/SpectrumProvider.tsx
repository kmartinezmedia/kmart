import React, {memo} from 'react';
import { SpectrumContext } from '@kmart/theme/spectrum/context';
import { SpectrumMode } from '@kmart/types';
import { useSpectrum } from '@kmart/theme/spectrum/useSpectrum';

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
