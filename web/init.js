const {
  generateExports,
  generateShorthandSpaceProps,
  generateCleanElements,
} = require('@kmart/utils');

generateExports({ dir: 'src/core', wildcard: true });
generateExports({ dir: 'src/utils', wildcard: true });
generateExports({ dir: 'src/widgets', wildcard: true });
generateShorthandSpaceProps({ dest: 'src/theme/spaceProps.js' });
generateCleanElements({ dest: 'src/utils/cleanElement.js' });
