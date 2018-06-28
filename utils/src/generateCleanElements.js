import fs from "fs";
import path from "path";
import capitalize from "lodash/capitalize";
import prettier from "prettier";

const cleanUtils = `import React from "react";
import Ratio from "react-ratio";
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
);`;

const domElements = [
  "div",
  "span",
  "button",
  "a",
  "img",
  "section",
  "article",
  "iframe",
  "input",
  "select",
  "label"
];

const customComponents = ["Ratio"];

const cleanElements = domElements
  .map(el => `export const Clean${capitalize(el)} = cleanElement("${el}");`)
  .join("\n");

const cleanComponents = customComponents
  .map(el => `export const Clean${capitalize(el)} = cleanElement(${el});`)
  .join("\n");

const cleanPropTypes = [...domElements, ...customComponents]
  .map(el => `Clean${capitalize(el)}.propTypes = mixinNames;`)
  .join("\n");

export const generateCleanElements = ({ dest }) =>
  fs.writeFileSync(
    path.join(process.cwd(), dest),
    prettier.format(
      cleanUtils +
        "\n\n" +
        cleanElements +
        "\n" +
        cleanComponents +
        "\n\n" +
        cleanPropTypes
    )
  );
