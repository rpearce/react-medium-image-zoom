require('@testing-library/jest-dom/extend-expect')

// https://stackoverflow.com/a/68468204/680394
const { TextEncoder, TextDecoder } = require('util') // eslint-disable-line @typescript-eslint/no-var-requires
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

Object.defineProperty(window, 'scroll', {
  value: () => undefined,
  writable: true,
})
