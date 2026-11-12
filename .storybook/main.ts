import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  viteFinal: viteConfig =>
    mergeConfig(viteConfig, {
      resolve: {
        // Exact match: @rpearce/image-zoom/styles.css must keep its own
        // resolution
        alias: [
          {
            find: /^@rpearce\/image-zoom$/,
            replacement: fileURLToPath(
              new URL('../packages/image-zoom/src/index.ts', import.meta.url),
            ),
          },
        ],
      },
    }),
}
export default config
