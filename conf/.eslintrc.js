module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    //'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'jsx-a11y/no-onchange': 'off', // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/398
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': ['error', { semi: false, singleQuote: true }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'never'],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['packages/react-medium-image-zoom/*.{ts,tsx}'],
      extends: [
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
      ],
      plugins: ['react', 'react-hooks'],
      rules: {
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react/prop-types': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
}
