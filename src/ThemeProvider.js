import React from "react";
import styled, {
  ThemeProvider as StyledThemeProvider,
  injectGlobal
} from "styled-components";
import { theme as defaultTheme } from "./theme";
import { initThemeProvider } from "./initThemeProvider";

const debug = props => {
  console.log(props);
};

const injectGlobals = mergedTheme =>
  injectGlobal`
  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ${mergedTheme.fonts[mergedTheme.fonts.default]};
    font-size: ${mergedTheme.fontSizesPx.p}px;
    line-height: ${mergedTheme.baseLineHeight / mergedTheme.baseFontSize};
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    ${mergedTheme.responsive.md`
      font-size: ${mergedTheme.fontSizesPx.p - 1}px;
    `};
    ${mergedTheme.responsive.sm`
      font-size: ${mergedTheme.fontSizesPx.p - 1}px;
    `};
  }

  body {
    margin: 0;
    scroll-behavior: smooth;
    overflow-x: hidden;

    ul {
      list-style-type: disk;
      padding-left: ${mergedTheme.rems(24)};
    }
  }
  ${mergedTheme.html}
`;

export default class ThemeProvider extends React.Component {
  state = {
    theme: defaultTheme
  };

  componentDidMount() {
    const mergedTheme = initThemeProvider(this.props);
    injectGlobals(mergedTheme);
    this.setState({ theme: mergedTheme });
  }

  render() {
    return (
      <StyledThemeProvider theme={this.state.theme}>
        {this.props.children}
      </StyledThemeProvider>
    );
  }
}
