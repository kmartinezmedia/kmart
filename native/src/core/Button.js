import { Button as RNButton } from "react-native";
import styled from "styled-components/native";

export const Button = styled(RNButton).attrs({
  color: p => p.theme.colors[p.color]
})`
  ${p => p.theme.setupComponent(p)};
`;
