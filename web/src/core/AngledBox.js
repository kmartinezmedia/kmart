import styled from "styled-components";
import { Box } from "./Box";

export const AngledBox = Box.extend`
  clip-path: polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%);
  ${p => p.theme.responsive.md`
    clip-path: polygon(0% 0%,100% 5%,100% 94%,0% 100%)
  `} ${p => p.theme.responsive.sm`
    clip-path: polygon(0% 0%,100% 3%,100% 95%,0% 100%)
  `};
`;

AngledBox.displayName = "Angled Box";
