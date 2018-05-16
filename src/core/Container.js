import styled from "styled-components";

const maxWidth = props =>
  props.maxWidth
    ? { maxWidth: `${props.maxWidth}px` }
    : { maxWidth: props.theme.maxContainerWidth };

export const Container = styled.div`
  ${maxWidth};
  ${p => p.theme.setupComponent(p)};
  position: relative;
  margin: 0 auto;
  ${p => p.theme.responsive.xl`
    max-width: 90%;
  `};
`;

Container.displayName = "Container";
