module.exports = {
  preset: 'react-scripts',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^dld-books$': '<rootDir>/src/__mocks__/dld-books.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!dld-books)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testEnvironment: 'jsdom'
};
