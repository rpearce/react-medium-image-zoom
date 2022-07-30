export default {
  collectCoverageFrom: ['<rootDir>/source/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'expect-puppeteer',
    '<rootDir>/jest.setup.ts',
  ],
  verbose: true,
}
