import type { Instance } from './instance.js'
import { createIconCompress } from './template.js'

/**
 * Set an attribute only when its value differs, or remove it for undefined.
 * Re-setting the same src, srcset or sizes reloads an <img> (run: a second
 * `load` event), so an update that changes nothing must not write them.
 */
function put(el: Element, name: string, value: string | undefined): void {
  if (value === undefined) {
    el.removeAttribute(name)
  } else if (el.getAttribute(name) !== value) {
    el.setAttribute(name, value)
  }
}

const nonEmpty = (value: string | null | undefined): string | undefined =>
  value == null || value === '' ? undefined : value

/**
 * The built-in modalContent: the modal img, then the unzoom button. Created
 * once per instance; it survives teardown and is appended to every dialog.
 */
export function ensureContent(inst: Instance): HTMLElement {
  if (inst.content !== null) return inst.content

  const content = document.createElement('div')
  content.setAttribute('data-rmiz-modal-content', '')

  const img = document.createElement('img')
  img.setAttribute('data-rmiz-modal-img', '')

  const button = document.createElement('button')
  button.setAttribute('data-rmiz-btn-unzoom', '')
  button.type = 'button'
  button.appendChild(createIconCompress())

  content.append(img, button)
  inst.content = content
  inst.modalImg = img
  inst.btnUnzoom = button
  return content
}

/**
 * The element as its own consumer: the modal img's source attributes from
 * the state (only while there is an image, and not yet for SVG sources), and
 * the unzoom button's label
 */
export function writeBuiltIn(inst: Instance): void {
  const s = inst.state
  const img = inst.modalImg
  if (img !== null && s.hasImage && !s.isSvg) {
    put(img, 'alt', s.alt) // an empty alt is meaningful
    put(img, 'crossorigin', nonEmpty(s.crossOrigin))
    // sizes and srcset before src, because of Firefox flickering on zoom
    put(img, 'sizes', nonEmpty(s.sizes))
    put(img, 'srcset', nonEmpty(s.srcset))
    put(img, 'src', nonEmpty(s.src))
  }
  inst.btnUnzoom?.setAttribute(
    'aria-label',
    inst.host.getAttribute('label-unzoom') ?? 'Minimize image',
  )
}
