import { KeyboardAvoidingView as KAV, Animated } from "react-native";
import styled from "styled-components/native";

export const KeyboardAvoidingView = styled(KAV)`
  ${p => p.theme.setupComponent(p)};
`;

const AKAV = Animated.createAnimatedComponent(KAV);

export const AnimatedKeyboardAvoidingView = styled(AKAV)`
  ${p => p.theme.setupComponent(p)};
`;
