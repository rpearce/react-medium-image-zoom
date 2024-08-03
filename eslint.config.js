// @ts-check

import eslint from '@eslint/js'
import eslintConfigStandard from 'eslint-config-standard'
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPromise from 'eslint-plugin-promise'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

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
  ...compat.config(eslintConfigStandard),
  eslintPluginPromise.configs['flat/recommended'],
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
      'space-before-function-paren': 'off',
      'spaced-comment': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
    },
  },
]
