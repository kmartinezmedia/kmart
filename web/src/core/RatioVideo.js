import React from "react";
import styled from "styled-components";
import { RatioBox } from "./RatioBox";
import { BackgroundImage } from "./";

export const RatioVideo = ({ ratio, width, src, children, ...otherProps }) => {
  return (
    <RatioBox ratio={ratio} width={width} {...otherProps}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%" }}
      >
        <source src={`${src}.web`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </RatioBox>
  );
};

RatioVideo.displayName = "Ratio Video";
