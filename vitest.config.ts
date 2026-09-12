import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.{ts,tsx}'],
    pool: 'vmThreads',
    restoreMocks: true,
    setupFiles: ['./test/setup.ts'],
  },
})
