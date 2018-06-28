import React from "react";
import styled from "styled-components";

export const Label = styled.label`
  ${p => p.theme.setupComponent(p)};
  z-index: 1;
  position: absolute;
  top: 50%;
  white-space: nowrap;
  pointer-events: none;
  transform: ${p => {
    if (p.focused || (p.blurred && p.hasText)) {
      return `translateY(-${p.theme.rems(20)}) scale(0.85)`;
    } else {
      return "translateY(-50%)";
    }
  }};
  transform-origin: left top;
  left: ${p => p.theme.rems(16)};
  transition: all ${p => p.theme.transitions.quick};
  opacity: 1;
  &:after {
    content: "*";
    opacity: ${p => (p.required ? 1 : 0)};
    position: absolute;
    right: -8px;
    color: red;
  }
`;

Label.defaultProps = {
  fontSize: "p",
  fontFamily: "sans",
  color: "primary",
  error: false
};
