import styled from "styled-components";
import { CleanDiv } from "../utils";

export const Box = styled(CleanDiv)`
  position: relative;
  ${p => p.theme.setupComponent(p)};
`;

Box.displayName = "Box";
