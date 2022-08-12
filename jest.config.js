export default {
  collectCoverageFrom: ['<rootDir>/source/**/*.{ts,tsx}'],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/jest.setup.ts',
  ],
  verbose: true,
}
