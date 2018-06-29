import { Animated, Text as ReactText } from "react-native";
import styled from "styled-components/native";

export const Text = styled(ReactText)`
  color: white;
  font-family: "Rubik-Medium";
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedText = styled(Animated.Text)`
  ${p => p.theme.setupComponent(p)};
`;
