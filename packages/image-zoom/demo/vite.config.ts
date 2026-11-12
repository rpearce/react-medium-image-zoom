import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

export default {
  root: resolve(here, '../../..'),
  server: { open: '/packages/image-zoom/demo/index.html' },
}
