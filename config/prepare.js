const { generateExports, generateMixins } = require("../src/prepare");

generateExports({ dir: "core", wildcard: true });
generateExports({ dir: "utils", wildcard: true });
generateExports({ dir: "widgets", wildcard: true });
generateMixins();
