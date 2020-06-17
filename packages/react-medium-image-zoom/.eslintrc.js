module.exports = {
  extends: [
    '@rpearce/eslint-config-iz',
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
}
