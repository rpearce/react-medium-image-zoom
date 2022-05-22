export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/source/@types'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  testEnvironment: 'jsdom',
  verbose: true
}
