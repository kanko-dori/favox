module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: { react: { version: 'detect' } },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  extends: [
    'eslint:recommended', // Default rules
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules
  ],
  rules: {
    'react/prop-types': 'off', // We will use TypeScript's types for component props instead.
    'react/react-in-jsx-scope': 'off', // No need to import React with Next.js
    'jsx-a11y/anchor-is-valid': 'off', // This rule is not compatible with how Next.js's <Link />
    // I suggest this setting for requiring return types on functions only where usefull
    '@typescript-eslint/explicit-function-return-type': [
      'warn', {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true
      }
    ],
  },
};