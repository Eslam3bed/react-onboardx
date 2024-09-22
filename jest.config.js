module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$', // This will match files ending with `.test.ts` or `.test.tsx`
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__test__/setupTests.ts'],
};