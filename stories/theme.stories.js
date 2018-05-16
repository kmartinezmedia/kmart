import React from "react";
import { storiesOf } from "@storybook/react";
import { colors } from "./colors";
import { typography } from "./typography";
import { shorthandProps } from "./shorthandProps";
import { shorthandAttributes } from "./shorthandAttributes";

const stories = storiesOf("Theme", module);

stories.add("Colors", colors);
stories.add("Typography", typography);
stories.add("Properties", shorthandProps);
stories.add("Attributes", shorthandAttributes);
