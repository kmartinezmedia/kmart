import { Animated, ScrollView } from "react-native";
import styled from "styled-components/native";

export default styled.ScrollView`
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedScrollView = styled(Animated.ScrollView)`
  ${p => p.theme.setupComponent(p)};
`;
