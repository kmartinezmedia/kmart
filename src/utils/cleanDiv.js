import React from "react";
import PropTypes from "prop-types";
import { propTypes } from "styled-system";
import shorthandAttributes from "../theme/shorthandAttributes";
import shorthandProps from "../theme/shorthandProps";
import ReactRatio from "react-ratio";

const cleanElement = Component => {
  return class Cleaned extends React.Component {
    render() {
      const next = {};
      const keys = Object.keys(Cleaned.propTypes || {});
      for (let key in this.props) {
        if (keys.includes(key)) continue;
        next[key] = this.props[key];
      }

      return React.createElement(Component, {
        ...next,
        ref: el => (this.el = el)
      });
    }
  };
};

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

export const defaultPropTypes = {
  ...sAttrs,
  ...sProps
};

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
