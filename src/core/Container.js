import styled from "styled-components";
import PropTypes from "prop-types";

const maxWidth = props =>
  props.maxWidth
    ? { maxWidth: `${props.maxWidth}px` }
    : { maxWidth: props.theme.maxContainerWidth };

export const Container = styled.div`
  ${maxWidth};
  ${p => p.theme.setupComponent(p)};
  position: relative;
  margin-left: auto;
  margin-right: auto;
  ${p => p.theme.responsive.xl`
    max-width: 90%;
  `};
`;

Container.propTypes = {
  maxWidth: PropTypes.number
};

Container.displayName = "Container";
