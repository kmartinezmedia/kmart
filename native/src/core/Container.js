import styled from "styled-components/native";
import { View } from "./View";

export const Container = styled(View)`
  ${p => p.theme.setupComponent(p)};
  ${p => p.theme.shorthandProps.px24};
`;
