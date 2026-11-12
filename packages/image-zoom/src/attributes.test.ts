import { expect, it } from 'vitest'
import {
  parseBool,
  parseCrossOrigin,
  parseNumber,
  parseSwipe,
} from './attributes.js'

it.each<[string | null, boolean]>([
  [null, false],
  ['', true],
  ['true', true],
  ['zoomed', true],
  ['false', false],
])('parseBool(%j) is %j', (v, out) => {
  expect(parseBool(v)).toBe(out)
})

it.each<[string | null, number, number]>([
  [null, 10, 10],
  ['', 10, 10],
  ['abc', 10, 10],
  ['0', 10, 0],
  ['20', 0, 20],
  ['Infinity', 10, Number.POSITIVE_INFINITY],
])('parseNumber(%j, %j) is %j', (v, fallback, out) => {
  expect(parseNumber(v, fallback)).toBe(out)
})

it.each<[string | null, 'unzoom' | 'none']>([
  [null, 'unzoom'],
  ['none', 'none'],
  ['unzoom', 'unzoom'],
  ['', 'unzoom'],
  ['false', 'unzoom'],
  ['NONE', 'unzoom'],
])('parseSwipe(%j) is %j', (v, out) => {
  expect(parseSwipe(v)).toBe(out)
})

it.each<[string | null, 'anonymous' | 'use-credentials' | null]>([
  [null, null],
  ['', 'anonymous'],
  ['anonymous', 'anonymous'],
  ['use-credentials', 'use-credentials'],
  ['x', 'anonymous'],
])('parseCrossOrigin(%j) is %j', (v, out) => {
  expect(parseCrossOrigin(v)).toBe(out)
})
