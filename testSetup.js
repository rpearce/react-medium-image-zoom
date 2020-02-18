import '@testing-library/jest-dom/extend-expect'

Object.defineProperty(window, 'scroll', { value: () => {}, writable: true })

// https://github.com/calvellido/focus-options-polyfill/pull/11/files#r380408715
document.scrollingElement = document.documentElement
