import styled from "styled-components";
import { CleanSection } from "../utils";
import { AngledBox } from "./Box";

export const Section = styled.section`
  ${p => p.theme.setupComponent(p)};
`;

Section.defaultProps = {
  mb: 6
};

Section.displayName = "Section";
