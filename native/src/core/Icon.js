import { Platform, Animated } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Icon = styled(Ionicons).attrs({
  color: p => p.theme.colors[p.color]
})`
  ${p => p.theme.setupComponent(p)};
`;

export const MaterialIcon = styled(MaterialIcons).attrs({
  color: p => p.theme.colors[p.color]
})`
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedIcon = Animated.createAnimatedComponent(Icon);
