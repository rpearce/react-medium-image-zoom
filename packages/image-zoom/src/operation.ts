import { parseNumber } from './attributes.js'
import { writeBuiltIn } from './content.js'
import { type Instance, INITIAL_STATE, statesEqual } from './instance.js'
import {
  createDialog,
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
 * Write the host's state and the shadow tree from inst.state
 */
function writeShadow(inst: Instance, ghostStyle: StyleObject): void {
  const found = inst.state.hasImage
  if (found) {
    inst.internals?.states.add('found')
  } else {
    inst.internals?.states.delete('found')
  }
  const ghost = inst.parts.ghost
  ghost.hidden = !found
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
 * built-in content and the modal img's geometry. Runs before the report, so a
 * statechange never sees hasImage and the dialog disagree.
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
  writeModalImg(inst, inst.state.modalImgStyle)
}

/**
 * Read layout and the source into the next snapshot; returns the ghost's
 * style for write
 */
function read(inst: Instance): StyleObject {
  const source = hasImage(inst) ? inst.imgEl : null
  const ghostStyle = getStyleGhost(source)
  const next = nextState(inst, source)
  if (!statesEqual(next, inst.state)) {
    inst.state = Object.freeze(next)
  }
  return ghostStyle
}

function write(inst: Instance, ghostStyle: StyleObject): void {
  writeShadow(inst, ghostStyle)
  writeDialog(inst)
}

/**
 * Read, then write. It never dispatches: an operation ends with report().
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
  let ghostStyle: StyleObject = {}
  return {
    read: () => {
      ghostStyle = read(target())
    },
    write: () => {
      write(target(), ghostStyle)
    },
    finish: () => {
      report(target())
    },
  }
}
