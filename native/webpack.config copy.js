const path = require("path");
const dependencies = Object.keys(require("./package.json").dependencies);

module.exports = {
  devtool: "source-map",
  entry: {
    browser: "./src/browser/index.js",
    native: "./src/native/index.js"
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    library: "kmart",
    libraryTarget: "umd"
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      constants$: path.resolve(__dirname, "constants.js")
    }
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  watch: process.env.NODE_ENV === "production" ? false : true,
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
