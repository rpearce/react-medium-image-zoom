import { describe, it, expect, afterEach } from 'vitest'
import { getStyleModalImg } from './get-style-modal-img.js'
import {
  setupBrowserGlobals,
  createTargetEl,
  createLoadedImgEl,
  resetWindowDimensions,
} from './test-helpers.js'

afterEach(() => {
  resetWindowDimensions()
})

// =============================================================================
// Regular path (no loadedImgEl)
// =============================================================================

describe('regular path (no loadedImgEl)', () => {
  it('returns position and transform when not zoomed', () => {
    setupBrowserGlobals({ width: 1024, height: 768 })
    const targetEl = createTargetEl('img', {
      top: 50,
      left: 100,
      width: 200,
      height: 150,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 50,
      left: 100,
      width: 200,
      height: 150,
      transform: 'translate(0,0) scale(1)',
    })
  })

  it('centers image when zoomed', () => {
    setupBrowserGlobals({ width: 1024, height: 768 })
    const targetEl = createTargetEl('img', {
      top: 50,
      left: 100,
      width: 200,
      height: 150,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: true,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 50,
      left: 100,
      width: 200,
      height: 150,
      transform: 'translate(312px,259px) scale(1)',
    })
  })

  it('handles image larger than viewport', () => {
    setupBrowserGlobals({ width: 400, height: 300 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 800,
      height: 600,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 0,
      left: 0,
      width: 400,
      height: 300,
      transform: 'translate(0,0) scale(2)',
    })
  })
})

// =============================================================================
// Scalable src detection
// =============================================================================

describe('scalable src detection', () => {
  it('SVG element (isSvg=true) scales to fill viewport', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: undefined,
      isSvg: true,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 0,
      left: 0,
      width: 1000,
      height: 500,
      transform: 'translate(0,0) scale(0.2)',
    })
  })

  it('hasZoomImg=true treated as scalable', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: true,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 0,
      left: 0,
      width: 1000,
      height: 500,
      transform: 'translate(0,0) scale(0.2)',
    })
  })

  it('data:image/svg+xml src treated as scalable', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'data:image/svg+xml;base64,abc123',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 0,
      left: 0,
      width: 1000,
      height: 500,
      transform: 'translate(0,0) scale(0.2)',
    })
  })

  it('.svg file extension treated as scalable', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'logo.svg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 0,
      left: 0,
      width: 1000,
      height: 500,
      transform: 'translate(0,0) scale(0.2)',
    })
  })
})

// =============================================================================
// Object-fit path (loadedImgEl provided, targetEl is img)
// =============================================================================

describe('object-fit path (loadedImgEl provided, targetEl is img)', () => {
  it('contain layout', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { objectFit: 'contain', objectPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('img', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 800,
      naturalHeight: 400,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 70,
      left: 10,
      width: 800,
      height: 400,
      transform: 'translate(0,0) scale(0.5)',
    })
  })

  it('cover layout', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { objectFit: 'cover', objectPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('img', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 800,
      naturalHeight: 400,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 20,
      left: -90,
      width: 800,
      height: 400,
      transform: 'translate(0,0) scale(0.75)',
    })
  })

  it('none layout', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { objectFit: 'none', objectPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('img', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 200,
      naturalHeight: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 120,
      left: 110,
      width: 200,
      height: 100,
      transform: 'translate(0,0) scale(1)',
    })
  })

  it('scale-down behaves like contain when target exceeds container', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { objectFit: 'scale-down', objectPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('img', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 800,
      naturalHeight: 400,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 70,
      left: 10,
      width: 800,
      height: 400,
      transform: 'translate(0,0) scale(0.5)',
    })
  })

  it('scale-down behaves like none when target fits container', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { objectFit: 'scale-down', objectPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('img', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 200,
      naturalHeight: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 120,
      left: 110,
      width: 200,
      height: 100,
      transform: 'translate(0,0) scale(1)',
    })
  })
})

// =============================================================================
// Div background path (loadedImgEl provided, targetEl is div)
// =============================================================================

describe('div background path (loadedImgEl provided, targetEl is div)', () => {
  it('cover background layout', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { backgroundSize: 'cover', backgroundPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('div', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 800,
      naturalHeight: 400,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 20,
      left: -90,
      width: 800,
      height: 400,
      transform: 'translate(0,0) scale(0.75)',
    })
  })

  it('contain background layout', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { backgroundSize: 'contain', backgroundPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('div', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 800,
      naturalHeight: 400,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 70,
      left: 10,
      width: 800,
      height: 400,
      transform: 'translate(0,0) scale(0.5)',
    })
  })

  it('auto background layout', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { backgroundSize: 'auto', backgroundPosition: '50% 50%' },
    )
    const targetEl = createTargetEl('div', {
      top: 20,
      left: 10,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 200,
      naturalHeight: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 120,
      left: 110,
      width: 200,
      height: 100,
      transform: 'translate(0,0) scale(1)',
    })
  })
})

// =============================================================================
// Natural dimensions
// =============================================================================

describe('natural dimensions', () => {
  it('uses natural dimensions from loadedImgEl when available', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 400,
      height: 300,
    })
    const loadedImgEl = createLoadedImgEl({
      naturalWidth: 1600,
      naturalHeight: 1200,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result).toEqual({
      top: 0,
      left: 0,
      width: 1000,
      height: 750,
      transform: 'translate(0,0) scale(0.4)',
    })
  })
})

// =============================================================================
// User CSS transform
// =============================================================================

describe('user CSS transform', () => {
  it('appends centered user transform when not zoomed', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { transform: 'scaleX(-1)' },
    )
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result.transform).toBe(
      'translate(0,0) scale(1) translate(100px,50px) scaleX(-1) translate(-100px,-50px)',
    )
  })

  it('includes centered user transform when zoomed', () => {
    setupBrowserGlobals(
      { width: 1000, height: 800 },
      { transform: 'scaleX(-1)' },
    )
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: true,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result.transform).toBe(
      'translate(400px,350px) scale(1) translate(100px,50px) scaleX(-1) translate(-100px,-50px)',
    )
  })

  it('no-op when transform is "none"', () => {
    setupBrowserGlobals({ width: 1000, height: 800 }, { transform: 'none' })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result.transform).toBe('translate(0,0) scale(1)')
  })

  it('no-op when transform is empty ""', () => {
    setupBrowserGlobals({ width: 1000, height: 800 }, { transform: '' })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    expect(result.transform).toBe('translate(0,0) scale(1)')
  })
})

// =============================================================================
// shouldRefresh
// =============================================================================

describe('shouldRefresh', () => {
  it('sets transitionDuration when zoomed and shouldRefresh', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: true,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: true,
      targetEl,
    })

    expect(result.transitionDuration).toBe('0.01ms')
  })

  it('does not set transitionDuration when not zoomed', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const result = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'photo.jpg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: true,
      targetEl,
    })

    expect(result.transitionDuration).toBeUndefined()
  })
})

// =============================================================================
// Offset
// =============================================================================

describe('offset', () => {
  it('offset reduces scaled size', () => {
    setupBrowserGlobals({ width: 1000, height: 800 })
    const targetEl = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const withoutOffset = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'logo.svg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 0,
      shouldRefresh: false,
      targetEl,
    })

    const targetEl2 = createTargetEl('img', {
      top: 0,
      left: 0,
      width: 200,
      height: 100,
    })

    const withOffset = getStyleModalImg({
      hasZoomImg: false,
      imgSrc: 'logo.svg',
      isSvg: false,
      isZoomed: false,
      loadedImgEl: undefined,
      offset: 100,
      shouldRefresh: false,
      targetEl: targetEl2,
    })

    expect(withoutOffset.width).toBe(1000)
    expect(withoutOffset.height).toBe(500)
    expect(withOffset.width).toBe(800)
    expect(withOffset.height).toBe(400)
    expect(withOffset).toEqual({
      top: 0,
      left: 0,
      width: 800,
      height: 400,
      transform: 'translate(0,0) scale(0.25)',
    })
  })
})
