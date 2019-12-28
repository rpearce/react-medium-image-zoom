module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/testSetup.js']
}
