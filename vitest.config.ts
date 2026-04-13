import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@rpearce\/image-zoom\/react$/,
        replacement: resolve(rootDir, 'packages/image-zoom/react.js'),
      },
      {
        find: /^@rpearce\/image-zoom$/,
        replacement: resolve(rootDir, 'packages/image-zoom/src/image-zoom.ts'),
      },
    ],
  },
  test: {
    environment: 'happy-dom',
    include: ['packages/*/src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
    setupFiles: ['./test/setup.ts'],
  },
})
