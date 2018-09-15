import styled from "styled-components";
import { CleanDiv } from "../utils";

export const Flex = styled(CleanDiv)`
  display: flex;
  ${p => p.theme.setupComponent(p)};
`;

Flex.displayName = "Flex";
