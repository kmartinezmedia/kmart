import styled from "styled-components";
import { Button } from "./Button";

export const ConnectedButton = styled(Button)`
  margin-left: -${p => p.theme.defaultRadius};
  flex-shrink: 0;
  white-space: nowrap;
`;

ConnectedButton.displayName = "Connected Button";

export const ConnectedButtonText = styled.span`
  opacity: ${p => (p.hide ? 0 : 1)};
  transition: opacity ${p => p.theme.transitions.default};
`;

ConnectedButtonText.displayName = "Connected Button Text";
