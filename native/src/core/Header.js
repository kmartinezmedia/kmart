import React from 'react';
import { Text } from './Text';
import { Container } from './Container';
import { TouchableOpacity } from './TouchableOpacity';

export const Header = ({
  onLeft = () => {},
  onRight = () => {},
  text,
  iconLeft = '',
  iconRight = '',
}) => (
  <Container jcc py16 aic>
    {iconLeft !== '' && (
      <TouchableOpacity onPress={onLeft} absolute top={8} left={24}>
        {iconLeft}
      </TouchableOpacity>
    )}
    <Text navigationHeaderLight>{text}</Text>
    {iconRight !== '' && (
      <TouchableOpacity onPress={onRight} absolute top={8} right={24}>
        {iconRight}
      </TouchableOpacity>
    )}
  </Container>
);
