import { colors } from "./colors";
import { breakpoints, devices, responsive } from "./responsive";
import { transitions } from "./transitions";
import { rems, setupComponent } from "./utils";
export const theme = {
  setupComponent,
  colors,
  breakpoints,
  devices,
  responsive,
  rems,
  transitions,
  maxContainerWidth: "1024px",
  shadows: [`0 1px 2px 10px rgba(0,0,0,0)`, `0 1px 40px 5px rgba(0,0,0,0.1)`]
};
