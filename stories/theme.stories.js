import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import orderBy from "lodash/orderBy";
import { theme, Section, Flex, Box, Text, Container } from "../lib";
const {
  fontVariations,
  fontSizes,
  fontSizesPx,
  fontWeights,
  lineHeightsPx,
  lineHeights
} = theme;

const stories = storiesOf("Theme", module);

stories.add("Properties", () => {
  const height = number("height", 400);
  const width = number("width", 400);
  const bg = text("bg", "teal");
  return <Box height={height} width={width} bg={bg} />;
});

stories.add("Colors", () => {
  const height = number("height", 400);
  const width = number("width", 400);
  const bg = text("bg", "teal");
  return <Box height={height} width={width} bg={bg} />;
});

stories.add("Typography", () => {
  const fontFamilyOptions = fontVariations.map(item => item.familyProp);
  const fontFamily = select(
    "font-family",
    fontFamilyOptions,
    fontFamilyOptions[0],
    "fontfamily"
  );
  const fontSizeOptions = Object.keys(fontSizes);
  const fontSize = select(
    "font-size",
    fontSizeOptions,
    fontSizeOptions[0],
    "fontsize"
  );
  const fontWeightOptions = Object.keys(fontWeights);
  const fontWeight = select(
    "font-weight",
    fontWeightOptions,
    fontWeightOptions[0],
    "fontweight"
  );

  const lineHeightOptions = Object.keys(lineHeights);
  return (
    <Section>
      <Container>
        <Box height={88}>
          <Text
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={fontSize}
          >
            {"Lorem ipsum"}
          </Text>
        </Box>
        <Flex mt={5}>
          <Box>
            <Text h5 bold>
              {"Font families"}
            </Text>
            {fontFamilyOptions.map((item, i) => (
              <Text h5 light>
                {item}
              </Text>
            ))}
          </Box>
          <Box ml64>
            <Text h5 bold>
              {"Font sizes"}
            </Text>
            {fontSizeOptions.map((item, i) => (
              <Flex columns key={`fontsize_${i}`}>
                <Text h5 light mr8>{`${fontSizesPx[item]}px`}</Text>
                <Text h5 light>{`${fontSizes[item]}`}</Text>
              </Flex>
            ))}
          </Box>
          <Box ml64>
            <Text h5 bold>
              {"Line heights"}
            </Text>
            {lineHeightOptions.map((item, i) => (
              <Flex columns key={`lineheight_${i}`}>
                <Text h5 light mr8>{`${lineHeightsPx[item]}px`}</Text>
                <Text h5 light>{`${lineHeights[item]}`}</Text>
              </Flex>
            ))}
          </Box>
          <Box ml64>
            <Text h5 bold>
              {"Font weights"}
            </Text>
            {fontWeightOptions.map((item, i) => (
              <Flex columns key={`fontweight_${i}`}>
                <Text h5 light mr8>
                  {item}
                </Text>
                <Text h5 light>{`${fontWeights[item]}`}</Text>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Container>
    </Section>
  );
});
