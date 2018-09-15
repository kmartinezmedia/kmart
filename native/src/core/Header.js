import React from "react";
import { Text, Container, TouchableOpacity, Icon } from "./";

export const Header = ({
  onLeft = () => {},
  onRight = () => {},
  text,
  iconLeft = "",
  iconRight = ""
}) => (
  <Container jcc py16 aic>
    {iconLeft !== "" && (
      <TouchableOpacity onPress={onLeft} absolute top={8} left={24}>
        <Icon name={iconLeft} size={32} color="white" />
      </TouchableOpacity>
    )}
    <Text navigationHeaderLight>{text}</Text>
    {iconRight !== "" && (
      <TouchableOpacity onPress={onRight} absolute top={8} right={24}>
        <Icon name={iconRight} size={32} color="white" />
      </TouchableOpacity>
    )}
  </Container>
);
