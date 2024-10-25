// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx', '**/*-test.js', '**/*-test.ts'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    'no-undef': 'off',
  },
};
