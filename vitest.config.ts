import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['source/**/*.test.ts'],
    restoreMocks: true,
  },
})
