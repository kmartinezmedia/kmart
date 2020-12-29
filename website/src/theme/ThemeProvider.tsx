import React from 'react';
import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';
import { ThemeProvider as KmartThemeProvider } from 'kmart';

const ThemeProvider: React.FC = props => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  return (
    <KmartThemeProvider spectrum={isDarkTheme ? 'dark' : 'light'}>
      <ThemeContext.Provider value={{ isDarkTheme, setLightTheme, setDarkTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </KmartThemeProvider>
  );
};

export default ThemeProvider;
