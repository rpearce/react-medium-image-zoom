import { fileURLToPath } from 'node:url'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const HAPPY = [
  'packages/*/src/utils/**/*.test.ts',
  'packages/*/src/**/*.happy-dom.test.{ts,tsx}',
]
const JSDOM = ['packages/*/src/**/*.jsdom.test.tsx']

export default defineConfig({
  resolve: {
    // Exact match: @rpearce/image-zoom/styles.css must keep its own resolution
    alias: [
      {
        find: /^@rpearce\/image-zoom$/,
        replacement: fileURLToPath(
          new URL('./packages/image-zoom/src/index.ts', import.meta.url),
        ),
      },
    ],
  },
  test: {
    restoreMocks: true,
    setupFiles: ['./test/setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['packages/*/src/**/*.test.{ts,tsx}'],
          exclude: [...HAPPY, ...JSDOM],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
            viewport: { width: 1280, height: 720 },
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'happy-dom',
          environment: 'happy-dom',
          pool: 'vmThreads',
          include: HAPPY,
        },
      },
      {
        extends: true,
        test: { name: 'jsdom', environment: 'jsdom', include: JSDOM },
      },
    ],
  },
})
