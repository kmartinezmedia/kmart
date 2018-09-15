import styled from "styled-components";
import { CleanLink } from "../utils";
import { Button } from "./Button";

export const OutlineButton = Button.extend`
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: currentcolor;
`;

export const OutlineButtonLink = OutlineButton.withComponent(CleanLink)
  .extend``;

OutlineButton.defaultProps = {
  color: "primary",
  p: 1
};

OutlineButton.displayName = "Outline Button";
