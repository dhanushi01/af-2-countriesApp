module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/tests/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-router|react-router-dom)'
  ]
};