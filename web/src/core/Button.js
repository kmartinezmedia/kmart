import styled from "styled-components";
import { Link } from "react-router-dom";
import { CleanButton } from "../utils";

const secondary = props =>
  Object.keys(props).includes("secondary") && {
    backgroundColor: props.theme.colors.accent,
    color: props.theme.colors.accentDark
  };

export const Button = styled(CleanButton)`
  ${p => p.theme.setupComponent(p)};
  ${secondary};
  border-radius: 4px;
  transition: all ${p => p.theme.transitions.default};
  display: inline-block;
  position: relative;
  line-height: 1;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
  }

  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  &:active:after {
    opacity: 1;
  }
`;

Button.defaultProps = {
  fontFamily: "p",
  fontSize: "p",
  fontWeight: "semibold",
  p: 1,
  bg: "primary",
  color: "white",
  boxShadow: 2
};

Button.displayName = "Button";

export const ButtonLink = Button.withComponent("a");
export const ButtonInternalLink = Button.withComponent(Link).extend``;
