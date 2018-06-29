import styled from "styled-components/native";
import { FlatList, Animated } from "react-native";
const AFL = Animated.createAnimatedComponent(FlatList);

export default styled(FlatList)`
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedFlatList = styled(AFL)`
  ${p => p.theme.setupComponent(p)};
`;
