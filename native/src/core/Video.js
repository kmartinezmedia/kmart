import { Video } from "expo";
import styled from "styled-components/native";

export default styled(Video)`
  ${p => p.theme.setupComponent(p)};
`;
