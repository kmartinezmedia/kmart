import { Animated, View as ReactView } from 'react-native';
import styled from 'styled-components/native';

export const View = styled(ReactView)`
  ${p => p.theme.setupComponent(p)};
`;

export const AnimatedView = Animated.createAnimatedComponent(View);
