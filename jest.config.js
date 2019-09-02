module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}', '!src/components/**/index.js', '!src/index.js', '!src/store/index.js'],
  coverageReporters: ['json-summary', 'lcov', 'text'],
  coverageDirectory: 'reports/coverage',
  setupFiles: [],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
    '<rootDir>/src/**/*.(spec|test).{js,jsx,mjs}'
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node', 'mjs'],
  moduleNameMapper: {
    '^store(.*)$': '<rootDir>/src/store$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttg|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
