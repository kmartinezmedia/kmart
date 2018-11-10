module.exports = {
  plugins: [
    // Stage 2
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-react-jsx",
    // Stage 3
    // https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-class-properties
    // class properties are compiled to use an assignment expression instead of Object.defineProperty
    // necessary for compatibility with @babel/plugin-proposal-decorators
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-proposal-json-strings"
  ]
};
