import '@testing-library/jest-dom/extend-expect';

// Extend Jest's matchers with @testing-library/jest-dom
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeDisabled(): R;
      // Add more matchers if needed
    }
  }
}