module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-react', '@linaria'],
  plugins: ['@babel/plugin-proposal-export-namespace-from', 'macros'],
  ignore: ['./src/types'],
  env: {
    es6: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
    },
    cjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'cjs',
          },
        ],
      ],
    },
  },
};
