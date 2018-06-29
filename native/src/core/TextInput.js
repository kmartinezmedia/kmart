import { TextInput } from "react-native";
import styled from "styled-components/native";

export default styled(TextInput).attrs({
  placeholderTextColor: p => p.theme.colors[p.placeholderColor]
})`
  ${p => p.theme.setupComponent(p)};
`;
