import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-auto-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'
const isWatching = process.env.ROLLUP_WATCH === 'true'

const plugins = [
  external(),
  resolve({ browser: true }),
  commonjs({ include: /node_modules/ }),
  babel({
    configFile: './babel.config.js',
    only: ['./source'],
    rootMode: 'upward',
    runtimeHelpers: true,
    sourceMaps: 'inline'
  }),
  postcss({ modules: true, minimize: isProd }),
  isProd && terser({ sourcemap: true })
]

const esm = {
  name: 'react-medium-image-zoom',
  file: './dist/index.esm.js',
  format: 'esm',
  sourcemap: true
}

const cjs = {
  name: 'react-medium-image-zoom',
  file: './dist/index.cjs.js',
  format: 'cjs',
  sourcemap: true
}

const config = {
  input: './source/index.js',
  output: [esm, ...(isWatching ? [] : [cjs])],
  plugins
}

export default config
