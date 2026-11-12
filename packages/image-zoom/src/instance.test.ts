import { expect, it } from 'vitest'
import { INITIAL_STATE, statesEqual } from './instance.js'
import type { ImageZoomState } from './types.js'

const build = (): ImageZoomState => ({
  hasImage: true,
  isSvg: false,
  alt: 'A lighthouse',
  src: 'a.png',
  srcset: undefined,
  sizes: undefined,
  crossOrigin: null,
  modalState: 'LOADED',
  isZoomImgLoaded: true,
  modalImgStyle: { width: 200, height: 150, transform: 'scale(1)' },
})

it('the initial state is frozen, down to its modalImgStyle', () => {
  expect(Object.isFrozen(INITIAL_STATE)).toBe(true)
  expect(Object.isFrozen(INITIAL_STATE.modalImgStyle)).toBe(true)
  expect(INITIAL_STATE.modalImgStyle).toEqual({})
})

it('separately built equal states are equal', () => {
  expect(statesEqual(build(), build())).toBe(true)
})

it('states differing in one modalImgStyle entry are unequal', () => {
  const b = build()
  expect(
    statesEqual(build(), {
      ...b,
      modalImgStyle: { ...b.modalImgStyle, width: 201 },
    }),
  ).toBe(false)
})

it('states differing in one top-level field are unequal', () => {
  expect(statesEqual(build(), { ...build(), modalState: 'UNLOADING' })).toBe(
    false,
  )
})
