import fs from 'fs';
import path from 'path';
import capitalize from 'lodash/capitalize';
import split from 'lodash/split';
import prettier from 'prettier';

const cleanUtils = `import React from "react";
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
);`;

const domElements = [
  'div',
  'span',
  'button',
  'a',
  'img',
  'section',
  'article',
  'iframe',
  'input',
  'select',
  'label',
];

const customComponents = ['Ratio', 'Link'];

const allElements = [
  ...domElements.map(item => ({
    element: `"${item}"`,
    name: capitalize(item),
  })),
  ...customComponents.map(item => ({ element: item, name: item })),
];

const cleanElements = allElements
  .map(
    ({ name, element }) =>
      `export const Clean${name} = cleanElement(${element});`,
  )
  .join('\n');

const cleanPropTypes = allElements
  .map(({ name }) => `Clean${name}.propTypes = mixinNames;`)
  .join('\n');

export const generateCleanElements = ({ dest }) =>
  fs.writeFileSync(
    path.join(process.cwd(), dest),
    prettier.format(
      cleanUtils + '\n\n' + cleanElements + '\n\n' + cleanPropTypes,
    ),
  );
