/* eslint-disable unicorn/prefer-module */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:unicorn/all',
    '@react-native',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unicorn', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'unicorn/prevent-abbreviations': [
      2,
      {
        replacements: {
          args: false,
          arg: false,
          props: false,
          prop: false,
          ref: false,
          params: false,
          param: false,
        },
      },
    ],
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
