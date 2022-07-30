export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
  testEnvironment: 'jsdom',
  verbose: true,
}
