import React from "react";
import { Container, Flex, Box, theme, Text } from "@kmart/web";
const { shorthandAttributes: attrs } = theme;

export const shorthandAttributes = () => {
  return (
    <Container>
      <Flex stacked jcsb aifs wrap mt24>
        {Object.keys(attrs).map((item, i) => {
          return (
            <Flex columns>
              <Text color="#000" h5 bold mr8>
                {item}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Container>
  );
};
