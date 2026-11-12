import { parseBool, parseNumber } from './attributes.js'
import { writeBuiltIn } from './content.js'
import { type Instance, INITIAL_STATE, statesEqual } from './instance.js'
import {
  createDialog,
  removeDialog,
  writeDialogClass,
  writeModalImg,
} from './modal.js'
import { type Job, runJobs, schedule, unschedule } from './scheduler.js'
import { defaultBodyAttrs } from './scroll-lock.js'
import { hasImage, track, untrack } from './source.js'
import type { ShadowParts } from './template.js'
import type { ImageZoomState } from './types.js'
import { testImg, testSvg } from './utils/element-tests.js'
import { getImgAlt } from './utils/get-img-alt.js'
import { getImgSrc } from './utils/get-img-src.js'
import { getStyleGhost } from './utils/get-style-ghost.js'
import { getStyleModalImg } from './utils/get-style-modal-img.js'
import type { StyleObject, SupportedImage } from './utils/types.js'

export interface Controller {
  readonly state: ImageZoomState
  readonly dialog: HTMLDialogElement | null
  readonly modalContent: HTMLElement | null
  connect: () => void
  disconnect: () => void
  attributeChanged: (name: string) => void
}

/**
 * 12 random hex characters, as setId does today
 */
function randomId(): string {
  const gen4 = (): string => Math.random().toString(16).slice(-4)
  return gen4() + gen4() + gen4()
}

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
  const label = inst.host.getAttribute('label-zoom') ?? 'Expand image'
  const alt = inst.state.alt
  inst.parts.button.setAttribute(
    'aria-label',
    alt !== undefined && alt !== '' ? `${label}: ${alt}` : label,
  )
}

/**
 * The dialog exists while hasImage; then its class, the built-in content and
 * the modal img's geometry. Runs before the report, so a statechange never
 * sees hasImage and the dialog disagree.
 */
function writeDialog(inst: Instance): void {
  if (!inst.state.hasImage) {
    removeDialog(inst)
    return
  }
  if (inst.dialog === null) createDialog(inst)
  writeDialogClass(inst)
  if (!inst.isCustom) writeBuiltIn(inst)
  writeModalImg(inst, inst.state.modalImgStyle)
}

/**
 * Dispatch one statechange when state or dialog differ from the last report,
 * or on the first operation after a connect
 */
function report(inst: Instance): void {
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

function setUp(inst: Instance): void {
  if (inst.isSetUp) return
  inst.isSetUp = true
  inst.isCustom = parseBool(inst.host.getAttribute('custom-content'))
  track(inst)
  inst.hooks.refresh()
}

/**
 * Undo setup when the host is really gone. Every task that adds a listener,
 * observer, timer, lock or piece of state adds its removal here.
 */
function teardown(inst: Instance): void {
  untrack(inst)
  unschedule(inst.job)
  removeDialog(inst) // built-in content stays in inst.content
  inst.generation += 1
  inst.imgEl = null
  inst.loadedImgEl = undefined
  inst.isSetUp = false
  inst.mustReport = true
}

/**
 * Everything the element does beyond reflecting attributes. An operation is
 * read → write → side effects → report; `job` lets the scheduler batch it.
 */
export function createController(
  host: HTMLElement,
  parts: ShadowParts,
  internals: ElementInternals | undefined,
): Controller {
  let ghostStyle: StyleObject = {}
  const job: Job = {
    read: () => {
      const source = hasImage(inst) ? inst.imgEl : null
      ghostStyle = getStyleGhost(source)
      const next = nextState(inst, source)
      if (!statesEqual(next, inst.state)) {
        inst.state = Object.freeze(next)
      }
    },
    write: () => {
      writeShadow(inst, ghostStyle)
      writeDialog(inst)
    },
    finish: () => {
      report(inst)
    },
  }

  const inst: Instance = {
    host,
    parts,
    internals,
    id: randomId(),
    hooks: {
      request: () => {}, // requests arrive in Task 10
      queue: () => {
        schedule(job)
      },
      refresh: () => {
        runJobs([job])
      },
      resized: () => {}, // Task 9
      transitionEnd: () => {}, // Task 9
    },
    job,
    isSetUp: false,
    generation: 0,
    isCustom: false,
    mustReport: true,
    appliedZoomed: false,
    modalState: 'UNLOADED',
    shouldRefresh: false,
    isZoomImgLoaded: false,
    prevBodyAttrs: defaultBodyAttrs,
    fallbackTimer: undefined,
    imgEl: null,
    loadedImgEl: undefined,
    dialog: null,
    overlay: null,
    content: null,
    modalImg: null,
    btnUnzoom: null,
    writtenStyle: {},
    styled: new WeakSet(),
    state: INITIAL_STATE,
    reportedState: undefined,
    reportedDialog: undefined,
  }

  return {
    get state() {
      return inst.state
    },
    get dialog() {
      return inst.dialog
    },
    modalContent: null,
    connect: () => {
      setUp(inst)
    },
    disconnect: () => {
      if (host.isConnected) return // a move, not a removal
      teardown(inst)
    },
    attributeChanged: name => {
      // zoomed is applied by the state machine (Task 9)
      if (name === 'zoomed' || !inst.isSetUp) return
      inst.hooks.refresh()
    },
  }
}
