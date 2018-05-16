import React from "react";
import styled from "styled-components";
import { CleanRatio } from "../utils";
import { BackgroundImage } from "./";

export const RatioBox = styled(CleanRatio)`
  ${p => p.theme.setupComponent(p)};
`;

RatioBox.displayName = "Ratio Box";
