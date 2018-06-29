import { Button } from "react-native";
import styled from "styled-components/native";

export default styled(Button).attrs({
  color: p => p.theme.colors[p.color]
})`
  ${p => p.theme.setupComponent(p)};
`;
