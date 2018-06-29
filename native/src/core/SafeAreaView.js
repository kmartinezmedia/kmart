import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

export default styled.SafeAreaView`
  ${p => p.theme.setupComponent(p)};
`;
