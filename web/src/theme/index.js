import * as typography from "./typography";
import { colors } from "./colors";
import { space } from "./space";
import { breakpoints, devices, responsive } from "./responsive";
import { rems, setupComponent } from "./utils";
import shorthandProps from "./shorthandProps";
import shorthandAttributes from "./shorthandAttributes";

export const theme = {
  ...typography,
  colors,
  space,
  shorthandProps,
  shorthandAttributes,
  setupComponent,
  breakpoints,
  devices,
  responsive,
  rems,
  maxContainerWidth: "1024px",
  transitions: {
    quick: "0.25s cubic-bezier(0.4, 0.0, 0.2, 1)",
    default: "0.5s cubic-bezier(0.4, 0.0, 0.2, 1)"
  },
  shadows: [`0 1px 2px 10px rgba(0,0,0,0)`, `0 1px 40px 5px rgba(0,0,0,0.1)`]
};
