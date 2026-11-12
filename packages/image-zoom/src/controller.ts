import { parseBool } from './attributes.js'
import { type Instance, INITIAL_STATE } from './instance.js'
import { createGestures } from './listeners.js'
import { applyZoomed, transitionEnd } from './machine.js'
import { removeDialog } from './modal.js'
import { createJob, report, update } from './operation.js'
import { schedule, unschedule } from './scheduler.js'
import { bodyScrollEnable, defaultBodyAttrs } from './scroll-lock.js'
import { hasImage, track, untrack } from './source.js'
import type { ShadowParts } from './template.js'
import type { ImageZoomState, ZoomChangeEventDetail } from './types.js'

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

/**
 * Every user request goes through here (handleZoom and handleUnzoom today).
 * Dropped while disabled, and a zoom while !canZoom (hasImage for now).
 * Otherwise zoomchange, and unless a listener cancels it, the zoomed
 * attribute, whose change runs the state machine.
 */
function request(inst: Instance, zoomed: boolean, event: Event): void {
  const host = inst.host
  if (parseBool(host.getAttribute('disabled'))) return
  if (zoomed && !hasImage(inst)) return
  const change = new CustomEvent<ZoomChangeEventDetail>('zoomchange', {
    detail: { zoomed, originalEvent: event },
    bubbles: true,
    cancelable: true,
    composed: false,
  })
  host.dispatchEvent(change)
  if (change.defaultPrevented) return
  if (zoomed) {
    host.setAttribute('zoomed', '')
  } else {
    host.removeAttribute('zoomed')
  }
}

function setUp(inst: Instance, onZoomClick: (event: Event) => void): void {
  if (inst.isSetUp) return
  inst.isSetUp = true
  inst.mustReport = true
  inst.isCustom = parseBool(inst.host.getAttribute('custom-content'))
  inst.parts.button.addEventListener('click', onZoomClick)
  track(inst)
  inst.hooks.refresh()
}

/**
 * Undo setup when the host is really gone, then report the initial state
 * once. Every task that adds a listener, observer, timer, lock or piece of
 * state adds its removal here.
 */
function teardown(inst: Instance, onZoomClick: (event: Event) => void): void {
  if (inst.modalState !== 'UNLOADED') {
    bodyScrollEnable(inst.prevBodyAttrs)
    inst.prevBodyAttrs = defaultBodyAttrs
  }
  inst.parts.button.removeEventListener('click', onZoomClick)
  untrack(inst)
  unschedule(inst.job)
  clearTimeout(inst.fallbackTimer)
  inst.gestures.removeAll()
  // The dialog leaves the DOM but keeps its listeners: a late `close` still
  // reaches it, and its `dialog !== inst.dialog` guard makes it inert.
  // Built-in content stays in inst.content.
  removeDialog(inst)
  inst.generation += 1
  inst.imgEl = null
  inst.loadedImgEl = undefined
  inst.modalState = 'UNLOADED'
  inst.appliedZoomed = false
  inst.shouldRefresh = false
  inst.isZoomImgLoaded = false
  inst.isSetUp = false
  inst.internals?.states.delete('found')
  inst.state = INITIAL_STATE
  // Reported always, and last, with isSetUp false so a listener's writes
  // start no operation. A job of this element still running in the current
  // flush then has nothing new to report; the next setup sets mustReport.
  inst.mustReport = true
  report(inst)
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
  const inst: Instance = {
    host,
    parts,
    internals,
    id: randomId(),
    hooks: {
      request: (zoomed, event) => {
        request(inst, zoomed, event)
      },
      queue: () => {
        schedule(inst.job)
      },
      refresh: () => {
        update(inst)
        report(inst)
      },
      resized: () => {
        inst.shouldRefresh = true
        inst.hooks.refresh()
      },
      transitionEnd: () => {
        transitionEnd(inst)
      },
    },
    job: createJob(() => inst),
    // Replaced below: createGestures takes the instance itself
    gestures: { enter: () => {}, removeAll: () => {} },
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
  inst.gestures = createGestures(inst)

  // The built-in zoom button, bound at setup and removed at teardown
  const onZoomClick = (event: Event): void => {
    request(inst, true, event)
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
      setUp(inst, onZoomClick)
    },
    disconnect: () => {
      if (host.isConnected) return // a move, not a removal
      teardown(inst, onZoomClick)
    },
    attributeChanged: name => {
      if (!inst.isSetUp) return
      if (name !== 'zoomed') {
        inst.hooks.refresh()
        return
      }
      // Applied only when the parsed value differs from the last one applied,
      // which is false at every setup: an attribute present then is ignored
      const zoomed = parseBool(host.getAttribute('zoomed'))
      if (zoomed === inst.appliedZoomed) return
      inst.appliedZoomed = zoomed
      applyZoomed(inst, zoomed)
    },
  }
}
