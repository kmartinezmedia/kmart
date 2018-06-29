import React from "react";
import Ratio from "react-ratio";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import shorthandProps from "../theme/shorthandProps";
import shorthandAttributes from "../theme/shorthandAttributes";

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

const mixinNames = Object.keys({
  ...shorthandProps,
  ...shorthandAttributes
}).reduce(
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

export const CleanDiv = cleanElement("div");
export const CleanSpan = cleanElement("span");
export const CleanButton = cleanElement("button");
export const CleanA = cleanElement("a");
export const CleanImg = cleanElement("img");
export const CleanSection = cleanElement("section");
export const CleanArticle = cleanElement("article");
export const CleanIframe = cleanElement("iframe");
export const CleanInput = cleanElement("input");
export const CleanSelect = cleanElement("select");
export const CleanLabel = cleanElement("label");
export const CleanRatio = cleanElement(Ratio);
export const CleanLink = cleanElement(Link);

CleanDiv.propTypes = mixinNames;
CleanSpan.propTypes = mixinNames;
CleanButton.propTypes = mixinNames;
CleanA.propTypes = mixinNames;
CleanImg.propTypes = mixinNames;
CleanSection.propTypes = mixinNames;
CleanArticle.propTypes = mixinNames;
CleanIframe.propTypes = mixinNames;
CleanInput.propTypes = mixinNames;
CleanSelect.propTypes = mixinNames;
CleanLabel.propTypes = mixinNames;
CleanRatio.propTypes = mixinNames;
CleanLink.propTypes = mixinNames;
