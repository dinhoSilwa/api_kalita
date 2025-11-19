export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.(ts|js)',
    '<rootDir>/src/**/*.test.(ts|js)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/__tests__/fixtures/',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/__tests__/fixtures/**',
  ],
  coverageDirectory: 'coverage',
  clearMocks: true,
  testTimeout: 10000,
};