import styled from 'styled-components';
import { CleanLink, CleanA } from '../utils';
import { Text } from './Text';

export const TextLink = styled(CleanA)`
  ${p => p.theme.setupComponent(p)};
  text-decoration: none;
  cursor: pointer;
`;

export const UnstyledLink = styled(CleanA)`
  text-decoration: none;
`;

export const UnstyledRouterLink = styled(CleanLink)`
  text-decoration: none;
`;

TextLink.defaultProps = {
  fontFamily: 'sans',
  fontWeight: 'bold',
  color: 'primary',
  bg: 'accent',
};

TextLink.displayName = 'TextLink';

export const LinkUnderlined = styled(TextLink)`
  border-bottom: 0.25em solid;
  background-color: transparent;
  margin-bottom: -0.25em;
`;

LinkUnderlined.defaultProps = {
  borderColor: 'accent',
};

LinkUnderlined.displayName = 'Link Underlined';
