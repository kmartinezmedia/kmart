import { Platform, Animated } from "react-native";
import { Icon as RNIcon } from "expo";

import styled from "styled-components/native";

export const Icon = styled(RNIcon.Ionicons).attrs({
  color: p => p.theme.colors[p.color]
})`
  ${p => p.theme.setupComponent(p)};
`;

export const MaterialIcon = styled(RNIcon.MaterialIcons).attrs({
  color: p => p.theme.colors[p.color]
})`
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedIcon = Animated.createAnimatedComponent(Icon);
