const {
  generateExports,
  generateShorthandSpacePropsNative,
} = require('@kmart/utils');

generateExports({ dir: 'src/core', wildcard: true });
generateExports({ dir: 'src/utils', wildcard: true });
generateShorthandSpacePropsNative({ dest: 'src/theme/spaceProps.js' });
