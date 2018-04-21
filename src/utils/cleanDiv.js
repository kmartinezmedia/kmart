import PropTypes from "prop-types";
import cleanElement from "clean-element";
import { propTypes } from "styled-system";
import shorthandAttributes from "../theme/shorthandAttributes";
import shorthandProps from "../theme/shorthandProps";
import ReactRatio from "react-ratio";

export const CleanDiv = cleanElement("div");
export const CleanButton = cleanElement("button");
export const CleanImg = cleanElement("img");
export const CleanSection = cleanElement("section");
export const CleanRatio = cleanElement(ReactRatio);

const sAttrs = Object.keys(shorthandAttributes).reduce(
  (prev, next) => ({ ...prev, ...propTypes[next] }),
  {}
);

const sProps = Object.keys(shorthandProps).reduce(
  (prev, next) => ({
    ...prev,
    [next]: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool
    ])
  }),
  {}
);

CleanDiv.propTypes = {
  ...sAttrs,
  ...sProps
};

CleanButton.propTypes = {
  ...sAttrs,
  ...sProps
};

CleanImg.propTypes = {
  ...sAttrs,
  ...sProps
};

CleanSection.propTypes = {
  ...sAttrs,
  ...sProps
};

CleanRatio.propTypes = {
  ...sAttrs,
  ...sProps
};
