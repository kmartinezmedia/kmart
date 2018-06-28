var shell = require("shelljs");
const {
  generateExports,
  generateShorthandSpaceProps,
  generateCleanElements
} = require("./setup.js");
generateExports({ dir: "src/browser/core", wildcard: true });
generateExports({ dir: "src/browser/utils", wildcard: true });
generateExports({ dir: "src/browser/widgets", wildcard: true });
generateExports({ dir: "sketch/components", wildcard: true });
generateExports({ dir: "sketch/theme", wildcard: true });
generateShorthandSpaceProps();
generateCleanElements();
