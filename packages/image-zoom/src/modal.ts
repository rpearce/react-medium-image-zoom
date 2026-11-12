import { ensureContent } from './content.js'
import type { Instance } from './instance.js'
import type { StyleObject } from './utils/types.js'

// Every property getStyleModalImg can return
const STYLE_KEYS = [
  'top',
  'left',
  'width',
  'height',
  'transform',
  'transitionDuration',
] as const

// The dialog-class value last written to each dialog (null: no class)
const writtenClass = new WeakMap<HTMLDialogElement, string | null>()

function setClass(dialog: HTMLDialogElement, value: string | null): void {
  writtenClass.set(dialog, value)
  if (value === null) {
    dialog.removeAttribute('class')
  } else {
    dialog.setAttribute('class', value)
  }
}

/**
 * Find or create a container for the dialog
 */
export function getDialogContainer(): HTMLDivElement {
  const existing = document.querySelector<HTMLDivElement>('[data-rmiz-portal]')

  if (existing !== null) {
    return existing
  }

  const el = document.createElement('div')
  el.setAttribute('data-rmiz-portal', '')
  document.body.appendChild(el)

  return el
}

/**
 * The light-DOM dialog: the overlay, then (built-in content only) the
 * content, appended to the portal
 */
export function createDialog(inst: Instance): void {
  const dialog = document.createElement('dialog')
  dialog.setAttribute('data-rmiz-modal', '')
  dialog.setAttribute('role', 'dialog')
  dialog.setAttribute('aria-modal', 'true')
  dialog.id = `rmiz-modal-${inst.id}`
  dialog.setAttribute('aria-labelledby', `rmiz-modal-img-${inst.id}`)
  setClass(dialog, inst.host.getAttribute('dialog-class'))

  const overlay = document.createElement('div')
  overlay.setAttribute('data-rmiz-modal-overlay', 'hidden')
  dialog.appendChild(overlay)

  if (!inst.isCustom) {
    dialog.appendChild(ensureContent(inst))
    // Port of handleDialogClick: have a click only unzoom in certain situations
    dialog.addEventListener('click', event => {
      if (event.target === inst.content || event.target === inst.modalImg) {
        event.stopPropagation()
        inst.hooks.request(false, event)
      }
    })
  }

  // Port of handleDialogClose: keep the close from closing a parent modal.
  // `close` is async: one queued by close() just before the dialog was
  // removed (teardown, or hasImage turning false) still fires after the
  // removal, and must not request.
  dialog.addEventListener('close', event => {
    if (dialog !== inst.dialog) return
    event.stopPropagation()
    inst.hooks.request(false, event)
  })

  // Port of handleDialogCancelStatic: prevent the browser from removing the
  // dialog on Escape
  dialog.addEventListener('cancel', event => {
    event.preventDefault()
  })

  // React's onTransitionEnd on the modal img bubbles from its descendants;
  // nothing else in the modal (the overlay, a caption) ends a transition
  dialog.addEventListener('transitionend', event => {
    const target = event.target
    if (
      target instanceof Node &&
      findModalImg(inst)?.contains(target) === true
    ) {
      inst.hooks.transitionEnd()
    }
  })

  getDialogContainer().appendChild(dialog)
  inst.dialog = dialog
  inst.overlay = overlay
}

/**
 * Remove the dialog. Built-in content leaves with it and stays in
 * inst.content for the next dialog.
 */
export function removeDialog(inst: Instance): void {
  inst.dialog?.remove()
  inst.dialog = null
  inst.overlay = null
}

/**
 * Follow dialog-class, writing only when it differs from what was last
 * written to this dialog. As with React's className diff, a class a consumer
 * adds survives until dialog-class itself changes.
 */
export function writeDialogClass(inst: Instance): void {
  const dialog = inst.dialog
  if (dialog === null) return
  const value = inst.host.getAttribute('dialog-class')
  if (writtenClass.get(dialog) !== value) setClass(dialog, value)
}

export function findModalImg(inst: Instance): HTMLElement | null {
  return inst.modalImg
}

const cssValue = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value

/**
 * Write the modal img's geometry one CSSOM property at a time, removing what
 * an earlier call wrote and this style lacks; other inline styles survive.
 * An <img> also gets unrounded width/height attributes and its id.
 */
export function writeModalImg(inst: Instance, style: StyleObject): void {
  const node = findModalImg(inst)
  if (node === null) return

  for (const key of STYLE_KEYS) {
    const value = style[key]
    if (value !== undefined) {
      node.style[key] = cssValue(value)
    } else if (inst.writtenStyle[key] !== undefined) {
      node.style[key] = ''
    }
  }

  if (node instanceof HTMLImageElement) {
    for (const name of ['width', 'height'] as const) {
      const n = style[name]
      if (n === undefined) {
        node.removeAttribute(name)
      } else {
        node.setAttribute(name, String(n))
      }
    }
    node.id = `rmiz-modal-img-${inst.id}`
  }

  inst.writtenStyle = style
  inst.styled.add(node)
}

/**
 * Port of ensureImgTransitionEnd's parse: the modal img's computed
 * transitionDuration (the first entry of a list) in ms, plus 50; undefined,
 * so no fallback timer, for 0 or NaN. Safari can fire transitionend late.
 */
export function fallbackMs(modalImg: Element): number | undefined {
  const td = getComputedStyle(modalImg).transitionDuration
  const tdFloat = parseFloat(td)
  if (tdFloat === 0 || Number.isNaN(tdFloat)) return undefined
  return tdFloat * (td.endsWith('ms') ? 1 : 1000) + 50
}
