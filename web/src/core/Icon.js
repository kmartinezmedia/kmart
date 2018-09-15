import React from "react";
import styled from "styled-components";
import { CleanDiv } from "../utils";

const StyledIcon = styled.p`
  ${p => p.theme.setupComponent(p)};
  font-family: "icons";
  cursor: pointer;
  opacity: 1;
  transition: 0.25s opacity linear;
  &:hover {
    opacity: 0.5;
  }
`;

export const Icon = ({ name, ...otherProps }) => (
  <StyledIcon className={`icon-${name}`} {...otherProps} />
);
