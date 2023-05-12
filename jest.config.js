const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', 'test'],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
