import { TouchableOpacity, Animated } from "react-native";
import styled from "styled-components/native";

export default styled.TouchableOpacity`
  ${p => p.theme.setupComponent(p)};
`;

const ATO = Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedTouchableOpacity = styled(ATO)`
  ${p => p.theme.setupComponent(p)};
`;
