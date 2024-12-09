import path from 'node:path'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' with { type: 'json' }

export default (async () => {
  const outDir = path.dirname(pkg.main)
  const outDirTypes = `${outDir}/types`

  return [
    {
      input: './source/index.ts',
      output: {
        dir: outDir, // TODO: `file: pkg.main` - workaround via https://github.com/rollup/plugins/issues/1772#issuecomment-2519066903
        format: 'es',
        banner: "'use client';",
      },
      external: isExternal,
      plugins: [ts({
        tsconfig: './tsconfig.json',
        compilerOptions: { declarationDir: outDirTypes },
      })],
    },
    {
      input: `${outDirTypes}/index.d.ts`,
      output: { file: pkg.types, format: 'es' },
      plugins: [dts(), rmOnWrite(outDirTypes)],
    },
  ]
})()

function isExternal(id) {
  return !id.startsWith('.') && !id.startsWith('/')
}

function rmOnWrite(dir) {
  return {
    name: 'rollup-plugin-rm-on-write',
    writeBundle: {
      sequential: true,
      order: 'post',
      async handler() {
        return (await import('node:fs/promises')).rm(dir, { force: true, recursive: true })
      },
    },
  }
}
