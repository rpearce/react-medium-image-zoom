import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const rootDir = fileURLToPath(new URL('..', import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../packages/stories/**/*.mdx',
    '../packages/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  // Alias workspace packages to source so HMR picks up edits in
  // packages/*/src without requiring a rebuild of dist/. The order
  // matters: more specific subpath aliases must come before bare
  // module aliases or they'll be shadowed.
  viteFinal: cfg => ({
    ...cfg,
    resolve: {
      ...cfg.resolve,
      alias: [
        {
          find: /^@rpearce\/image-zoom\/styles\.css$/,
          replacement: resolve(rootDir, 'packages/image-zoom/styles.css'),
        },
        {
          find: /^@rpearce\/image-zoom$/,
          replacement: resolve(
            rootDir,
            'packages/image-zoom/src/image-zoom.ts',
          ),
        },
        {
          find: /^react-medium-image-zoom$/,
          replacement: resolve(
            rootDir,
            'packages/react-medium-image-zoom/src/index.ts',
          ),
        },
      ],
    },
  }),
}
export default config
