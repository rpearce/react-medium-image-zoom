import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { dirname, extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = 5180
const HOST = '127.0.0.1'
const CSP = "style-src 'self'; require-trusted-types-for 'script'"

const demoDir = dirname(fileURLToPath(import.meta.url))
const pkgDir = dirname(demoDir)
const roots = new Map([
  ['/demo/', demoDir],
  ['/dist/', join(pkgDir, 'dist')],
  ['/images/', join(pkgDir, '..', '..', 'stories', 'images')],
])

/** @type {Record<string, string>} */
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

/**
 * @param {import('node:http').ServerResponse} res
 * @param {number} status
 * @param {string | Buffer} body
 * @param {Record<string, string>} [headers]
 */
const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers)
  res.end(body)
}

/**
 * @param {string} pathname
 * @returns {string | null}
 */
const resolvePath = pathname => {
  for (const [prefix, dir] of roots) {
    if (pathname.startsWith(prefix)) {
      const root = normalize(dir)
      const file = normalize(join(root, pathname.slice(prefix.length)))
      return file.startsWith(root + sep) ? file : null
    }
  }
  return null
}

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
const handle = async (req, res) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname)
  } catch {
    send(res, 400, 'Bad request')
    return
  }
  if (pathname.includes('\0')) {
    send(res, 400, 'Bad request')
    return
  }
  const file = resolvePath(pathname)
  if (file === null) {
    send(res, 404, 'Not found')
    return
  }
  try {
    const body = await readFile(file)
    /** @type {Record<string, string>} */
    const headers = {
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    }
    if (file.endsWith(`${sep}csp.html`)) {
      headers['Content-Security-Policy'] = CSP
    }
    send(res, 200, body, headers)
  } catch {
    send(res, 404, 'Not found')
  }
}

const server = createServer((req, res) => {
  void handle(req, res)
})

server.listen(PORT, HOST, () => {
  process.stdout.write(`Open http://localhost:${PORT}/demo/csp.html\n`)
})
