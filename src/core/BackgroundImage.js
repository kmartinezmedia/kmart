import React from "react";
import styled from "styled-components";
import { CleanDiv, CleanRatio } from "../utils";

export const BackgroundImage = styled(CleanDiv)`
  ${p => p.theme.setupComponent(p)};
  background-image: ${p => `url(${p.src})`};
  background-position: center;
  background-repeat: no-repeat;
`;

BackgroundImage.defaultProps = {
  backgroundSize: "cover"
};

BackgroundImage.displayName = "BackgroundImage";

export const ReactRatio = styled(CleanRatio)`
  ${p => p.theme.setupComponent(p)};
`;

export const ImageWithRatio = ({
  ratio,
  width,
  src,
  children,
  ...otherProps
}) => {
  return (
    <ReactRatio ratio={ratio} width={width} {...otherProps}>
      <BackgroundImage src={src} h100 w100 cover />
      {children}
    </ReactRatio>
  );
};
