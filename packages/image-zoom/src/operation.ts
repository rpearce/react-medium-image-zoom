import { parseNumber } from './attributes.js'
import { cloneSvg, writeBuiltIn } from './content.js'
import { type Instance, INITIAL_STATE, statesEqual } from './instance.js'
import {
  canZoom,
  createDialog,
  discardOwnRecords,
  findModalImg,
  preStyle,
  removeDialog,
  writeDialogClass,
  writeModalImg,
} from './modal.js'
import type { Job } from './scheduler.js'
import { hasImage } from './source.js'
import type { ImageZoomState } from './types.js'
import { testImg, testSvg } from './utils/element-tests.js'
import { getImgAlt } from './utils/get-img-alt.js'
import { getImgSrc } from './utils/get-img-src.js'
import { getStyleGhost } from './utils/get-style-ghost.js'
import { getStyleModalImg } from './utils/get-style-modal-img.js'
import type { StyleObject, SupportedImage } from './utils/types.js'

function narrowCrossOrigin(
  value: string | null,
): 'anonymous' | 'use-credentials' | null {
  return value === 'anonymous' || value === 'use-credentials' ? value : null
}

/**
 * getStyleModalImg as today's render() calls it, frozen for the snapshot
 */
function readModalImgStyle(
  inst: Instance,
  source: SupportedImage,
  imgSrc: string | undefined,
): Readonly<StyleObject> {
  const host = inst.host
  return Object.freeze(
    getStyleModalImg({
      hasZoomImg: (host.getAttribute('zoom-src') ?? '') !== '',
      imgSrc,
      isSvg: testSvg(source),
      isZoomed: inst.modalState === 'LOADING' || inst.modalState === 'LOADED',
      loadedImgEl: inst.loadedImgEl,
      offset: parseNumber(host.getAttribute('zoom-margin'), 0),
      shouldRefresh: inst.shouldRefresh,
      targetEl: source,
    }),
  )
}

/**
 * The next snapshot; `source` is the tracked image while hasImage, else null
 */
function nextState(
  inst: Instance,
  source: SupportedImage | null,
): ImageZoomState {
  const isImg = testImg(source)
  const src = getImgSrc(source)
  return {
    hasImage: source !== null,
    isSvg: testSvg(source),
    alt: getImgAlt(source),
    src,
    srcset: isImg ? source.srcset : undefined,
    sizes: isImg ? source.sizes : undefined,
    crossOrigin: isImg ? narrowCrossOrigin(source.crossOrigin) : undefined,
    modalState: inst.modalState,
    isZoomImgLoaded: inst.isZoomImgLoaded,
    modalImgStyle:
      source === null
        ? INITIAL_STATE.modalImgStyle
        : readModalImgStyle(inst, source, src),
  }
}

const px = (n: number | undefined): string => (n === undefined ? '' : `${n}px`)

/**
 * What the read step hands to the write step
 */
interface Reading {
  ghostStyle: StyleObject
  // The host's computed box-sizing, read while the image is found (the ghost,
  // and the zoom-button slot in it, are hidden otherwise)
  boxSizing: string | undefined
}

/**
 * :state(found), written only when it changes: Chromium re-invalidates the
 * :state() rules on every add, even of a state the set already has. The set
 * is private to the element, so it is the record of the last write.
 */
function writeFound(inst: Instance, found: boolean): void {
  const states = inst.internals?.states
  if (states === undefined || states.has('found') === found) return
  if (found) {
    states.add('found')
  } else {
    states.delete('found')
  }
}

/**
 * The zoom-button slot's box-sizing: a concrete copy of the host's computed
 * value, so a slotted button under a `box-sizing: inherit` reset sizes as
 * with `inherit`. Explicit inheritance on this child of the ghost would
 * restyle it on every ghost geometry write.
 */
function writeButtonSlotBoxSizing(
  inst: Instance,
  boxSizing: string | undefined,
): void {
  if (boxSizing !== undefined) {
    inst.parts.buttonSlot.style.boxSizing = boxSizing
  }
}

/**
 * Write the host's state and the shadow tree from inst.state. The ghost (and
 * the zoom button in it) is hidden while !canZoom.
 */
function writeShadow(inst: Instance, reading: Reading): void {
  const found = inst.state.hasImage
  writeFound(inst, found)
  writeButtonSlotBoxSizing(inst, reading.boxSizing)
  const ghostStyle = reading.ghostStyle
  const ghost = inst.parts.ghost
  ghost.hidden = !canZoom(inst, found)
  ghost.style.top = px(ghostStyle.top)
  ghost.style.left = px(ghostStyle.left)
  ghost.style.width = px(ghostStyle.width)
  ghost.style.height = px(ghostStyle.height)
  // Written as visible at UNLOADED, not left unset, as today's inline style
  inst.parts.slot.style.visibility =
    inst.state.modalState === 'UNLOADED' ? 'visible' : 'hidden'
  const label = inst.host.getAttribute('label-zoom') ?? 'Expand image'
  const alt = inst.state.alt
  inst.parts.button.setAttribute(
    'aria-label',
    alt !== undefined && alt !== '' ? `${label}: ${alt}` : label,
  )
}

/**
 * The dialog exists while hasImage; then its class, the overlay state, the
 * built-in content, the modal img's geometry and, for an SVG source, a fresh
 * clone in the modal img (today's componentDidUpdate re-clones on every
 * update). Runs before the report, so a statechange never sees hasImage and
 * the dialog disagree.
 */
function writeDialog(inst: Instance): void {
  if (!inst.state.hasImage) {
    removeDialog(inst)
    return
  }
  if (inst.dialog === null) createDialog(inst)
  writeDialogClass(inst)
  const modalState = inst.state.modalState
  inst.overlay?.setAttribute(
    'data-rmiz-modal-overlay',
    modalState === 'LOADING' || modalState === 'LOADED' ? 'visible' : 'hidden',
  )
  if (!inst.isCustom) writeBuiltIn(inst)
  const style = inst.state.modalImgStyle
  writeModalImg(inst, style)
  const target = findModalImg(inst)
  if (target !== null) cloneSvg(inst, target, style)
}

/**
 * Pre-style a newly seen modal img, then read layout and the source into the
 * next snapshot; returns the ghost's style and the host's box-sizing for
 * write. With an image, hasImage and getStyleGhost have already brought style
 * and layout up to date, so the box-sizing read forces nothing more.
 */
function read(inst: Instance): Reading {
  preStyle(inst)
  const source = hasImage(inst) ? inst.imgEl : null
  const ghostStyle = getStyleGhost(source)
  const next = nextState(inst, source)
  if (!statesEqual(next, inst.state)) {
    inst.state = Object.freeze(next)
  }
  return {
    ghostStyle,
    boxSizing:
      source === null ? undefined : getComputedStyle(inst.host).boxSizing,
  }
}

/**
 * Write, then discard the dialog observer's records of those writes. Runs
 * before any dispatch: a takeRecords() after it would also drop what a
 * statechange listener inserted.
 */
function write(inst: Instance, reading: Reading): void {
  writeShadow(inst, reading)
  writeDialog(inst)
  discardOwnRecords(inst)
}

/**
 * Pre-style, read, write, discard own records. It never dispatches: an
 * operation ends with report().
 */
export function update(inst: Instance): void {
  write(inst, read(inst))
}

/**
 * Dispatch one statechange when state or dialog differ from the last report,
 * or on the first operation after a connect
 */
export function report(inst: Instance): void {
  const unchanged =
    !inst.mustReport &&
    inst.reportedState !== undefined &&
    statesEqual(inst.state, inst.reportedState) &&
    inst.dialog === inst.reportedDialog
  if (unchanged) return
  // Recorded before dispatching, so a listener's own operation compares
  // against this report
  inst.mustReport = false
  inst.reportedState = inst.state
  inst.reportedDialog = inst.dialog
  inst.host.dispatchEvent(new Event('statechange'))
}

/**
 * An update and its report as a scheduler job, so a batch runs every read
 * before any write. `target` resolves the instance, which holds the job.
 */
export function createJob(target: () => Instance): Job {
  let reading: Reading = { ghostStyle: {}, boxSizing: undefined }
  return {
    read: () => {
      reading = read(target())
    },
    write: () => {
      write(target(), reading)
    },
    finish: () => {
      report(target())
    },
  }
}
