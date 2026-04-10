// @ts-check

import eslintConfigLove from 'eslint-config-love'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginStorybook from 'eslint-plugin-storybook'

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
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
      'eslint.config.js',
    ],
  },
  eslintPluginReact.configs.flat.recommended,
  eslintPluginJSXA11y.flatConfigs.strict,
  eslintPluginReactHooks.configs.flat['recommended-latest'],
  ...eslintPluginStorybook.configs['flat/recommended'],
  {
    ...eslintConfigLove,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ...eslintConfigLove.languageOptions,
      parserOptions: {
        ...eslintConfigLove.languageOptions?.parserOptions,
        projectService: {
          ...eslintConfigLove.languageOptions?.parserOptions?.projectService,
          allowDefaultProject: [
            '.storybook/main.ts',
            '.storybook/preview.tsx',
            'vitest.config.ts',
          ],
        },
      },
    },
  },
  {
    files: ['stories/**/*'],
    rules: {
      'max-lines': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'max-lines': 'off',
    },
  },
  eslintConfigPrettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      '@typescript-eslint/no-magic-numbers': 'off',
      'require-unicode-regexp': 'off',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'react/prop-types': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
    },
  },
]
