import React from "react";
import styled from "styled-components";
import { RatioBox } from "./RatioBox";
import { BackgroundImage } from "./";

export const RatioImage = ({ ratio, width, src, children, ...otherProps }) => {
  return (
    <RatioBox ratio={ratio} width={width} {...otherProps}>
      <BackgroundImage src={src} h100 w100 cover />
      {children}
    </RatioBox>
  );
};

RatioImage.displayName = "Ratio Image";
