import { TouchableHighlight as RNTouchableHighlight } from "react-native";
import styled from "styled-components/native";

export const TouchableHighlight = styled(RNTouchableHighlight)`
  ${p => p.theme.setupComponent(p)};
`;
