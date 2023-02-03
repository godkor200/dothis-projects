module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  rootDir: './',
  moduleNameMapper: {
    '@Apps/(.*)$': '<rootDir>/apps/$1',
    '@Libs/(.*)$': '<rootDir>/libs/$1',
  },
};
