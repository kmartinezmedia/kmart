import { colors } from "./colors";
import { breakpoints, devices, responsive } from "./responsive";
import { space, spacePx } from "./space";
import { transitions } from "./transitions";
import { rems, setupComponent } from "./utils";
import * as typography from "./typography";
export const theme = {
  ...typography,
  setupComponent,
  colors,
  breakpoints,
  devices,
  responsive,
  rems,
  space,
  transitions,
  maxContainerWidth: "1024px",
  shadows: [`0 1px 2px 10px rgba(0,0,0,0)`, `0 1px 40px 5px rgba(0,0,0,0.1)`]
};
