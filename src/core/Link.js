import styled from "styled-components";
import { Link as ReactRouterLink } from "react-router-dom";
import { Text } from "./Text";

export const Link = Text.withComponent("a").extend`
  ${p => p.theme.setupComponent(p)};
  text-decoration: none;
  cursor: pointer;
`;

export const UnstyledLink = styled.a`
  text-decoration: none;
`;

export const UnstyledRouterLink = styled(ReactRouterLink)`
  text-decoration: none;
`;

Link.defaultProps = {
  fontFamily: "sans",
  fontWeight: "bold",
  color: "primary",
  bg: "accent"
};

Link.displayName = "Link";

export const LinkUnderlined = styled(Link)`
  border-bottom: 0.25em solid;
  background-color: transparent;
  margin-bottom: -0.25em;
`;

LinkUnderlined.defaultProps = {
  borderColor: "accent"
};

LinkUnderlined.displayName = "Link Underlined";
