import '@testing-library/jest-dom/extend-expect'

Object.defineProperty(window, 'scroll', {
  value: () => undefined,
  writable: true
})
