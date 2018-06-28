import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export const OutlineButton = Button.extend`
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: currentcolor;
`;

export const OutlineButtonLink = OutlineButton.withComponent(Link).extend``;

OutlineButton.defaultProps = {
  color: "primary",
  p: 1
};

OutlineButton.displayName = "Outline Button";
