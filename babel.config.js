module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    '@babel/preset-react',
    "@linaria"
  ],
  plugins: ['@babel/plugin-proposal-export-namespace-from', 'macros']
}