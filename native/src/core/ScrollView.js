import { Animated, ScrollView as RNScrollView } from "react-native";
import styled from "styled-components/native";

export const ScrollView = styled(RNScrollView)`
  ${p => p.theme.setupComponent(p)};
`;

// export const AnimatedScrollView = styled(Animated.ScrollView)`
//   ${p => p.theme.setupComponent(p)};
// `;
