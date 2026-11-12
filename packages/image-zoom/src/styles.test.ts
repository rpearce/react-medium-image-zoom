import { expect, it } from 'vitest'
import './index.js'
import './styles.css'
import css from './styles.css?inline'
import { get, IMG, mount, ready } from './test-helpers.js'

/**
 * A document holding only the stylesheet and `body`, where <image-zoom> is
 * not defined: the rules that apply before upgrade are checked there
 */
async function frame(body: string): Promise<Document> {
  const f = mount('<iframe></iframe>')
  if (!(f instanceof HTMLIFrameElement)) {
    throw new TypeError('frame: mounted an <iframe>')
  }
  const { promise, resolve } = Promise.withResolvers<void>()
  f.srcdoc = `<style>${css}</style>${body}`
  f.addEventListener(
    'load',
    () => {
      resolve()
    },
    { once: true },
  )
  await promise
  const doc = f.contentDocument
  if (doc === null) throw new TypeError('frame: no contentDocument')
  return doc
}

// Elements from the frame belong to its realm, so no instanceof narrowing
const display = (doc: Document, sel: string): string => {
  const el = doc.querySelector(sel)
  const view = doc.defaultView
  if (el === null || view === null) {
    throw new TypeError(`display: no ${sel} in the frame`)
  }
  return view.getComputedStyle(el).display
}

it('sets host display before upgrade', async () => {
  const doc = await frame(
    '<image-zoom id="a"></image-zoom><image-zoom id="b" inline></image-zoom><image-zoom id="c" inline="false"></image-zoom><image-zoom id="d" hidden></image-zoom>',
  )
  expect(['#a', '#b', '#c', '#d'].map(s => display(doc, s))).toEqual([
    'block',
    'inline',
    'block',
    'none',
  ])
})

it('hides slot children until the element is defined', async () => {
  const doc = await frame(
    '<image-zoom><img><svg slot="icon-unzoom"></svg><button slot="zoom-button">z</button></image-zoom>',
  )
  expect([display(doc, 'svg'), display(doc, 'button')]).toEqual([
    'none',
    'none',
  ])
  expect(display(doc, 'img')).not.toBe('none')
})

it('host display after upgrade', () => {
  const d = (m: string) => getComputedStyle(mount(m)).display
  expect([
    d('<image-zoom></image-zoom>'),
    d('<image-zoom inline></image-zoom>'),
    d('<image-zoom inline="false"></image-zoom>'),
    d('<image-zoom hidden></image-zoom>'),
  ]).toEqual(['block', 'inline', 'block', 'none'])
})

it("gives a found image the zoom-in cursor, but not a slotted button's icon", async () => {
  if (!CSS.supports('selector(:state(found))')) return
  const el = await ready(
    `<image-zoom><img src="${IMG}"><button slot="zoom-button"><svg></svg></button></image-zoom>`,
  )
  expect(getComputedStyle(get(el, 'img', HTMLImageElement)).cursor).toBe(
    'zoom-in',
  )
  expect(
    getComputedStyle(get(el, 'button svg', SVGSVGElement)).cursor,
  ).not.toBe('zoom-in')
})

it('no longer carries a light-DOM ghost rule', () => {
  expect(css).not.toContain('[data-rmiz-ghost]')
})
