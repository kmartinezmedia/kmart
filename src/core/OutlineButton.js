import styled from "styled-components";
import { Button } from "./Button";

export const OutlineButton = Button.extend`
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: currentcolor;
`;

OutlineButton.defaultProps = {
  color: "primary"
};

OutlineButton.displayName = "Outline Button";
