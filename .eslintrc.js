module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'airbnb',
    'airbnb-typescript/base',
    'airbnb/hooks',
    'prettier',
    'next/core-web-vitals',
  ],
  plugins: ['react'],
  ignorePatterns: ['.*.js', '*.config.js', 'plopfile.js'],
  rules: {
    // prefer named arrow-function components
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    // airbnb is using .jsx
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    // enforces premature optimization
    'react/jsx-no-bind': 'off',
    // use ES6+ deconstructed inner props instead of defaultProps
    'react/require-default-props': 'off',
    // ignore prop types since typescript is being used
    'react/prop-types': 'off',
  },
};
