module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/packages/*/source/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {},
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/*'],
  setupFilesAfterEnv: ['<rootDir>/conf/testSetup.ts'],
  testPathIgnorePatterns: ['dist/'],
  verbose: true,
}
