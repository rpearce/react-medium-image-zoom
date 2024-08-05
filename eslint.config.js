// @ts-check

import eslint from '@eslint/js'
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import neostandard from 'neostandard'
import tseslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'

export default [
  {
    ignores: [
      '!**/.*',
      '**/.git/',
      '**/.github/',
      '**/coverage/',
      '**/dist/',
      '**/docs/',
      '**/node_modules/',
    ],
  },
  eslint.configs.recommended,
  ...neostandard(),
  eslintPluginReact.configs.flat.recommended,
  eslintPluginJSXA11y.flatConfigs.strict,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      '@stylistic/jsx-closing-bracket-location': 'off',
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/jsx-quotes': 'off',
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/spaced-comment': 'off',
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
        imports: 'always-multiline',
        objects: 'always-multiline',
      }],
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
    },
  },
]
