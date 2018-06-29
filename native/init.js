const {
  generateExports,
  generateShorthandSpacePropsNative
} = require("@kmart/utils");

generateExports({ dir: "src/core", wildcard: true });
generateShorthandSpacePropsNative({ dest: "src/theme/spaceProps.js" });
