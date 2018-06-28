import React from "react";
import { text, number } from "@storybook/addon-knobs";
import { Container, Flex, RatioBox, theme, Text } from "@kmart/web";

export const colors = () => {
  const height = number("height", 400);
  const width = number("width", 400);
  return (
    <Container>
      <Flex jcsb aifs wrap mt24>
        {Object.keys(theme.colors).map((color, i) => {
          return (
            <RatioBox ratio={1} width="30%" bg={color} stacked p24 mb24 br4>
              <Text color="#000" h5 bold>
                {color}
              </Text>
            </RatioBox>
          );
        })}
      </Flex>
    </Container>
  );
};
