import React from "react";
import styled, {
  ThemeProvider as StyledThemeProvider,
  injectGlobal
} from "styled-components";
import XRay from "react-x-ray";
import { theme as defaultTheme } from "./theme";
import { initThemeProvider } from "./initThemeProvider";
import { baseFontSize, baseLineHeight } from "./theme/utils";

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
    font-family: ${mergedTheme.fonts.default};
    font-size: ${baseFontSize}px;
    line-height: ${baseLineHeight / baseFontSize};
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    ${mergedTheme.responsive.md`
      font-size: ${baseFontSize - 1}px;
    `};
    ${mergedTheme.responsive.sm`
      font-size: ${baseFontSize - 1}px;
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
    theme: defaultTheme,
    xrayOff: true
  };

  componentWillMount() {
    process.env.NODE_ENV !== "production" &&
      window.addEventListener("keydown", this.enableXRay);
    const mergedTheme = initThemeProvider(this.props);
    injectGlobals(mergedTheme);
    this.setState({ theme: mergedTheme });
    console.log(mergedTheme);
  }

  componentWillUnmount() {
    process.env.NODE_ENV !== "production" &&
      window.removeEventListener("keydown", this.enableXRay);
  }

  enableXRay = e =>
    e.keyCode === 88 && this.setState({ xrayOff: !this.state.xrayOff });

  render() {
    return (
      <StyledThemeProvider theme={this.state.theme}>
        <XRay grid={8} disabled={this.state.xrayOff}>
          {this.props.children}
        </XRay>
      </StyledThemeProvider>
    );
  }
}
