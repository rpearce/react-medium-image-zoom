import '@testing-library/jest-dom/extend-expect'

Object.defineProperty(window, 'scroll', {
  value: () => undefined,
  writable: true,
})

// Provide window.matchMedia implementation:
// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
global.window.matchMedia = jest.fn().mockImplementation((query) => ({
  addListener: jest.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeListener: jest.fn(),
}))
