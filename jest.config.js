module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.js'],
  coveragePathIgnorePatterns: ['<rootDir>/source/focus-options-polyfill.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/testSetup.js']
}
