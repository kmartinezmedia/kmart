import React from "react";
import { Container, Flex, Box, theme, Text } from "../lib";
const { shorthandProps: props } = theme;

export const shorthandProps = () => {
  return (
    <Container>
      <Flex stacked jcsb aifs wrap mt24>
        {Object.keys(props).map((item, i) => {
          return (
            <Flex columns>
              <Text color="#000" h5 bold mr8>
                {item}
              </Text>
              <Text color="grey" p italic>
                <code>{JSON.stringify(props[item])}</code>
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Container>
  );
};
