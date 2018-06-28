import { css } from "styled-components";
// ==========================================================================
// Responsive
// ==========================================================================
export const devices = [];

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) => (devices[key] = breakpoints[i]));

export const breakpoints = [30, 37.5, 56.25, 64.5];

// TODO should be closer to below
// const breakpoints = [
//   30,
//   37.5,
//   72,
//   80
// ]

const aliases = ["sm", "md", "lg", "xl"];

addAliases(breakpoints, aliases);

export const responsive = {};

aliases.map((label, i) => {
  return (responsive[label] = (...args) => css`
    @media (max-width: ${breakpoints[i]}em) {
      ${css(...args)};
    }
  `);
});
