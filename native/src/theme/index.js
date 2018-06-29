import * as typography from "./typography";
import colors from "./colors";
import shorthandProps from "./shorthandProps";
import shorthandAttributes from "./shorthandAttributes";
import { setupComponent } from "@kmart/utils/lib/setupComponent";
import { spaceNative } from "@kmart/utils/lib/space";

export const theme = {
  ...typography,
  shorthandAttributes,
  shorthandProps,
  setupComponent,
  colors,
  space: spaceNative,
  defaultRadius: "4px"
};
