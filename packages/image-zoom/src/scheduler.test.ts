import { describe, expect, it, vi } from 'vitest'
import {
  type Job,
  observeResize,
  runJobs,
  schedule,
  unobserveResize,
  unschedule,
} from './scheduler.js'
import { flush, mount } from './test-helpers.js'

const job = (name: string, log: string[]): Job => ({
  read: () => {
    log.push(`read ${name}`)
  },
  write: () => {
    log.push(`write ${name}`)
  },
  finish: () => {
    log.push(`finish ${name}`)
  },
})

describe('scheduler', () => {
  it('runs every read before any write, then the finishes', () => {
    const log: string[] = []
    runJobs([job('a', log), job('b', log)])
    expect(log).toEqual([
      'read a',
      'read b',
      'write a',
      'write b',
      'finish a',
      'finish b',
    ])
  })

  // happy-dom's window has no MessageChannel, and vitest's vm pools, which use
  // it as the global, add none (run). First to schedule in this file, so no
  // channel exists yet.
  it('falls back to a timer where there is no MessageChannel', async () => {
    const log: string[] = []
    const original = globalThis.MessageChannel
    Reflect.deleteProperty(globalThis, 'MessageChannel')
    try {
      schedule(job('a', log))
      await Promise.resolve()
      expect(log).toEqual([])
      await vi.waitFor(() => {
        expect(log).toEqual(['read a', 'write a', 'finish a'])
      })
    } finally {
      globalThis.MessageChannel = original
    }
  })

  it('flushes scheduled jobs together in a later task, each once', async () => {
    const log: string[] = []
    const a = job('a', log)
    const b = job('b', log)
    schedule(a)
    schedule(b)
    schedule(a)
    await Promise.resolve()
    expect(log).toEqual([])
    await flush()
    expect(log).toEqual([
      'read a',
      'read b',
      'write a',
      'write b',
      'finish a',
      'finish b',
    ])
  })

  it('drops an unscheduled job', async () => {
    const log: string[] = []
    const a = job('a', log)
    schedule(a)
    unschedule(a)
    await flush()
    expect(log).toEqual([])
  })

  it('a job scheduled during a flush runs after that flush, not inside it', async () => {
    const log: string[] = []
    const b = job('b', log)
    schedule({
      read: () => {},
      write: () => {},
      finish: () => {
        schedule(b)
        log.push('first flush done')
      },
    })
    // Wait for the second flush itself: engines differ on whether a timer or
    // an already-posted message comes first, so one flush() may be too early
    await vi.waitFor(() => {
      expect(log).toHaveLength(4)
    })
    expect(log).toEqual(['first flush done', 'read b', 'write b', 'finish b'])
  })

  it('delivers resizes of several targets as one read-all, write-all pass', async () => {
    const log: string[] = []
    const a = mount('<div style="width:10px;height:10px"></div>')
    const b = mount('<div style="width:10px;height:10px"></div>')
    observeResize(a, job('a', log))
    observeResize(b, job('b', log))
    await vi.waitFor(() => {
      expect(log.length).toBeGreaterThanOrEqual(6)
    })
    log.length = 0 // the initial callback
    a.style.width = '20px'
    b.style.width = '20px'
    await vi.waitFor(() => {
      expect(log).toEqual([
        'read a',
        'read b',
        'write a',
        'write b',
        'finish a',
        'finish b',
      ])
    })
    unobserveResize(a)
    unobserveResize(b)
  })
})
