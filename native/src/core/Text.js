import { Animated, Text as ReactText } from "react-native";
import styled from "styled-components/native";

export const Text = styled(ReactText)`
  color: white;
  ${p => p.theme.setupComponent(p)};
`;

Text.defaultProps = {
  fontFamily: "default"
};

export const AnimatedText = styled(Animated.Text)`
  ${p => p.theme.setupComponent(p)};
`;

AnimatedText.defaultProps = {
  fontFamily: "default"
};
