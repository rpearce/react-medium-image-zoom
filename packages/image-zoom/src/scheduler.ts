/**
 * Batches work from many instances so that every layout read happens before
 * any style write. It knows nothing about elements; it deals only in jobs.
 */
export interface Job {
  read: () => void
  write: () => void
  finish: () => void
}

/**
 * All reads, then all writes, then all finishes
 */
export function runJobs(jobs: Iterable<Job>): void {
  const list = [...jobs]
  for (const job of list) {
    job.read()
  }
  for (const job of list) {
    job.write()
  }
  for (const job of list) {
    job.finish()
  }
}

const queued = new Set<Job>()
let channel: MessageChannel | undefined

function flushQueue(): void {
  const jobs = [...queued]
  queued.clear()
  runJobs(jobs)
}

function createChannel(): MessageChannel {
  const created = new MessageChannel()
  created.port1.onmessage = flushQueue
  return created
}

/**
 * Post the flush as a task: a MessageChannel message, or a timer where there
 * is no MessageChannel (happy-dom), as React's scheduler does
 */
function postFlush(): void {
  if (typeof MessageChannel === 'undefined') {
    setTimeout(flushQueue, 0)
    return
  }
  channel ??= createChannel()
  channel.port2.postMessage(null)
}

/**
 * Queue a job; every job queued in one task runs together in a later task
 */
export function schedule(job: Job): void {
  if (queued.size === 0) {
    postFlush()
  }
  queued.add(job)
}

export function unschedule(job: Job): void {
  queued.delete(job)
}

const resizeJobs = new Map<Element, Job>()
let resizeObserver: ResizeObserver | undefined

function onResize(entries: ResizeObserverEntry[]): void {
  const jobs = new Set<Job>()
  for (const entry of entries) {
    const found = resizeJobs.get(entry.target)
    if (found !== undefined) {
      jobs.add(found)
    }
  }
  runJobs(jobs)
}

/**
 * Observe a target with the one shared ResizeObserver
 */
export function observeResize(target: Element, job: Job): void {
  resizeObserver ??= new ResizeObserver(onResize)
  resizeJobs.set(target, job)
  resizeObserver.observe(target)
}

export function unobserveResize(target: Element): void {
  resizeJobs.delete(target)
  resizeObserver?.unobserve(target)
}
