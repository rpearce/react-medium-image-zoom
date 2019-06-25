module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/source/**/*.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    '<rootDir>/testSetup'
  ]
}
