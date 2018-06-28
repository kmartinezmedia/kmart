const {
  generateExports,
  generateShorthandSpaceProps,
  generateCleanElements
} = require("@kmart/utils");

generateExports({ dir: "src/core", wildcard: true });
generateExports({ dir: "src/utils", wildcard: true });
generateExports({ dir: "src/widgets", wildcard: true });
generateShorthandSpaceProps({ dest: "src/theme/shorthandProps.js" });
generateCleanElements({ dest: "src/utils/cleanDiv.js" });
