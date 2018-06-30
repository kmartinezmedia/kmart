import { TouchableOpacity as RNTouchableOpacity, Animated } from "react-native";
import styled from "styled-components/native";

export const TouchableOpacity = styled(RNTouchableOpacity)`
  ${p => p.theme.setupComponent(p)};
`;

const ATO = Animated.createAnimatedComponent(RNTouchableOpacity);

export const AnimatedTouchableOpacity = styled(ATO)`
  ${p => p.theme.setupComponent(p)};
`;
