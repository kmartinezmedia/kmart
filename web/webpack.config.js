const path = require("path");
const dependencies = Object.keys(require("./package.json").dependencies);

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: "kmart",
    libraryTarget: "umd"
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src")
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
