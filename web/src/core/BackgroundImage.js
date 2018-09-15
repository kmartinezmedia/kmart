import styled from "styled-components";
import { CleanDiv } from "../utils";

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
