import { Image as ReactImage, Animated } from "react-native";
import styled from "styled-components/native";

export const Image = styled(ReactImage)`
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedImage = styled(
  Animated.createAnimatedComponent(ReactImage)
)`
  ${p => p.theme.setupComponent(p)};
`;
