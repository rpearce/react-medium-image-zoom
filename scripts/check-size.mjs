#!/usr/bin/env node

/**
 * Bundles a one-line `<Zoom>` consumer the way an app's production build
 * would (esbuild, minified ESM, react external). Fails if the bundle lost the
 * element's `customElements.define` call to tree-shaking, or if its gzip size
 * is over the budget. Also prints, for information, the core entry's size on
 * its own and how many bytes each source file puts in the consumer bundle.
 */

import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { build } from 'esbuild'

// The first measurement (9,770 B gzip) rounded up to the next 250 B. Last
// measured: 9,936 B.
const BUDGET_BYTES = 10_000

const ROOT = fileURLToPath(new URL('..', import.meta.url))

const CONSUMER =
  "import Zoom from './packages/react-medium-image-zoom/dist/index.js'; console.log(Zoom)"

const CORE =
  "import * as core from './packages/image-zoom/dist/index.js'; console.log(core)"

/** @param {string} contents */
const bundle = async contents => {
  const result = await build({
    absWorkingDir: ROOT,
    stdin: { contents, resolveDir: ROOT, loader: 'js' },
    bundle: true,
    minify: true,
    format: 'esm',
    external: ['react', 'react-dom'],
    metafile: true,
    write: false,
    logLevel: 'silent',
    // Don't read the repo's tsconfig.json: its `paths` would resolve
    // @rpearce/image-zoom to the TypeScript source instead of the built dist
    // that a consumer installs.
    tsconfigRaw: {},
  })
  const text = result.outputFiles[0].text
  const output = Object.values(result.metafile.outputs)[0]
  return {
    text,
    minified: Buffer.byteLength(text),
    gzip: gzipSync(text).length,
    inputs: Object.entries(output.inputs)
      .map(entry => ({ path: entry[0], bytes: entry[1].bytesInOutput }))
      .sort((a, b) => b.bytes - a.bytes),
  }
}

/** @param {number} n */
const fmt = n => n.toLocaleString('en-US')

// Sets the exit code instead of exiting, so every failure is reported and
// output still in a pipe (under `conc`) is not lost
/** @param {string} message */
const fail = message => {
  process.stderr.write(`check:size failed: ${message}\n`)
  process.exitCode = 1
}

const consumer = await bundle(CONSUMER)
const core = await bundle(CORE)

const lines = [
  `<Zoom> consumer: ${fmt(consumer.minified)} B minified, ` +
    `${fmt(consumer.gzip)} B gzip (budget ${fmt(BUDGET_BYTES)} B)`,
  `@rpearce/image-zoom entry alone: ${fmt(core.minified)} B minified, ` +
    `${fmt(core.gzip)} B gzip`,
  'Bytes in the minified consumer bundle, by input:',
  ...consumer.inputs.map(
    input => `  ${fmt(input.bytes).padStart(7)}  ${input.path}`,
  ),
]
process.stdout.write(`${lines.join('\n')}\n`)

if (!consumer.text.includes('customElements.define')) {
  fail(
    'the bundled <Zoom> consumer has no customElements.define call, so ' +
      '<image-zoom> would never be registered. Check the sideEffects field ' +
      'of @rpearce/image-zoom.',
  )
}

if (consumer.gzip > BUDGET_BYTES) {
  fail(
    `the <Zoom> consumer is ${fmt(consumer.gzip)} B gzip, over the budget ` +
      `of ${fmt(BUDGET_BYTES)} B by ${fmt(consumer.gzip - BUDGET_BYTES)} B.`,
  )
}
