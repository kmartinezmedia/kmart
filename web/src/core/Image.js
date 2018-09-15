import styled from "styled-components";
import { CleanImg } from "../utils";

export const Image = styled(CleanImg)`
  display: block;
  max-width: 100%;
  ${p => p.theme.setupComponent(p)};
`;

Image.defaultProps = {
  height: "auto"
};

Image.displayName = "Image";
