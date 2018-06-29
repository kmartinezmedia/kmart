import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

export default styled.TouchableHighlight`
  ${p => p.theme.setupComponent(p)};
`;
