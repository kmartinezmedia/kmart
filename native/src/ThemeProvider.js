import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { theme as defaultTheme } from "./theme";
import { initThemeProvider } from "./initThemeProvider";

export default class ThemeProvider extends React.Component {
  state = {
    theme: defaultTheme
  };

  componentDidMount() {
    const mergedTheme = initThemeProvider(this.props);
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
