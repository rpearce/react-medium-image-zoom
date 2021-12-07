import '@testing-library/jest-dom/extend-expect'
import 'jest-extended'

jest.mock('./source/useResizeObserver', () => () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}))
//Object.defineProperty(window, `scroll`, {
//  value: () => undefined,
//  writable: true,
//})

