module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/source/@types',
    'stories',
  ],
  moduleNameMapper: {},
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
  testPathIgnorePatterns: ['dist/', 'examples/'],
  verbose: true,
}
