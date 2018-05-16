var shell = require("shelljs");
const {
  generateExports,
  generateShorthandSpaceProps,
  generateCleanElements
} = require("../setup.js");
generateExports({ dir: "src/core", wildcard: true });
generateExports({ dir: "src/utils", wildcard: true });
generateExports({ dir: "src/widgets", wildcard: true });
generateShorthandSpaceProps();
generateCleanElements();
