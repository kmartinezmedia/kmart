import React from 'react';
import { createAnimatedComponent } from 'animated';
import { Box } from './Box';

const AnimatedDiv = createAnimatedComponent('div');

export const Animated = ({ style, children, ...otherProps }) => {
  return (
    <AnimatedDiv style={style}>
      <Box {...otherProps}>{children}</Box>
    </AnimatedDiv>
  );
};
