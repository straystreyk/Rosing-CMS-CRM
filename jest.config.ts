import { defaults } from 'jest-config';

module.exports = {
  'transform': {
    '^.+\\.tsx?$': 'ts-jest',
  },
  'moduleFileExtensions': [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  'testMatch': [
    '<rootDir>/**/__tests__/**/*.(ts|js)?(x)',
    '<rootDir>/**/?(*.)(spec|test).(ts|js)?(x)',
  ],
};