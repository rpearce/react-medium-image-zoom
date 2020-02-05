import { dirname } from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const plugins = [
  resolve(),
  commonjs({
    include: /node_modules/,
    namedExports: {
      'prop-types': ['bool', 'func', 'node', 'number', 'object', 'string'],
      'react-dom': ['createPortal']
    }
  }),
  babel({
    configFile: './babel.config.js',
    only: ['./source'],
    runtimeHelpers: true,
    sourceMaps: 'inline'
  }),
  postcss({
    extract: './dist/styles.css',
    modules: true,
    sourceMap: true
  })
]

const buildModules = [
  './source/index.js',
  './source/helpers.js',
  './source/Uncontrolled.js',
  './source/UncontrolledActivated.js',
  './source/Controlled.js',
  './source/ControlledActivated.js'
]

const isExternal = id => !id.startsWith('.')

const esm = [
  {
    input: buildModules,
    output: {
      dir: dirname(pkg.module),
      exports: 'named',
      format: 'esm',
      name: 'rmiz-esm',
      sourcemap: true
    },
    external: isExternal,
    plugins
  }
]

const cjs = [
  {
    input: buildModules,
    output: {
      dir: dirname(pkg.main),
      exports: 'named',
      format: 'cjs',
      name: 'rmiz-cjs',
      sourcemap: true
    },
    external: isExternal,
    plugins
  },
  {
    input: './source/index.js',
    output: {
      file: `${dirname(pkg.main)}/${pkg.name}.min.js`,
      exports: 'named',
      format: 'cjs',
      name: 'rmiz-cjs-min',
      sourcemap: true
    },
    external: isExternal,
    plugins: plugins.concat(terser())
  }
]

const umd = [
  {
    input: './source/index.js',
    output: {
      file: pkg.browser,
      exports: 'named',
      format: 'umd',
      globals: { react: 'React' },
      name: 'rmiz-umd',
      sourcemap: true
    },
    external: ['react'],
    plugins: plugins.concat(terser())
  }
]

let config

switch (process.env.BUILD_ENV) {
  case 'cjs':
    config = cjs
    break
  case 'esm':
    config = esm
    break
  case 'umd':
    config = umd
    break
  default:
    config = cjs.concat(esm).concat(umd)
}

export default config
