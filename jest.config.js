module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/source/focus-options-polyfill.js'
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
  verbose: true,
  collectCoverage: true
}
