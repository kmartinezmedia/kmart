const { generateExports, generateMixins } = require("../src/prepare");

generateExports({ dir: "src/core", wildcard: true });
generateExports({ dir: "src/utils", wildcard: true });
generateExports({ dir: "src/widgets", wildcard: true });
generateMixins();
