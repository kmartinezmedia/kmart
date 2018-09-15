const path = require("path");

module.exports = function(config, isPluginCommand) {
  config.resolve = {
    alias: {
      kmart: path.resolve(__dirname, "lib")
    }
  };
};
