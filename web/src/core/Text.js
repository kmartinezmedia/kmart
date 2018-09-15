import React from 'react';
import styled, { withTheme } from 'styled-components';

export const StyledText = styled.div`
  ${p => p.theme.setupComponent(p)};
`;

export const typeStyles = {
  hero: {
    fontWeight: 'semibold',
    element: 'h1',
  },
  h1: {
    fontWeight: 'semibold',
    mb: 3,
  },
  h2: {},
  h3: {
    fontWeight: 'regular',
  },
  h4: {
    fontWeight: 'regular',
  },
  h5: {
    fontWeight: 'light',
  },
  p: {
    fontWeight: 'regular',
  },
  span: {
    fontWeight: 'light',
  },
  small: {
    fontWeight: 'light',
    element: 'p',
  },
};

export const Text = withTheme(({ is = 'h1', theme, ...otherProps }) => {
  const { element = is, ...defaultProps } = typeStyles[is];
  const StyledElement = StyledText.withComponent(element);
  console.log(otherProps);
  return React.createElement(StyledElement, {
    fontFamily: theme.fonts[is],
    fontSize: theme.fontSizes[is],
    lineHeight: theme.lineHeights[is],
    color: theme.colors[is] || 'black',
    ...defaultProps,
    ...otherProps,
  });
});

Text.displayName = 'Text';

export class Title extends React.Component {
  createText = (string, i) => {
    if (string === 'Fertilome') {
      return (
        <u key={`${string}_${i}`}>
          <span className="register">{string}</span>{' '}
        </u>
      );
    } else {
      return (
        <u key={`${string}_${i}`}>
          <span>{string}</span>{' '}
        </u>
      );
    }
  };
  render() {
    const text = this.props.children.split(' ');
    return (
      <Text.h1 {...this.props}>
        {text.map((string, i) => this.createText(string, i))}
      </Text.h1>
    );
  }
}
