const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  watch: process.env.NODE_ENV === "production" ? false : true,
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: "kmart",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true
          }
        }
      }
    ]
  }
};
