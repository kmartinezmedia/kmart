import { TextInput as RNTextInput } from "react-native";
import styled from "styled-components/native";

export const TextInput = styled(RNTextInput).attrs({
  placeholderTextColor: p => p.theme.colors[p.placeholderColor]
})`
  ${p => p.theme.setupComponent(p)};
`;
