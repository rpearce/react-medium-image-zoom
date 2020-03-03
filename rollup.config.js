import { dirname } from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const getBabelOpts = ({ useESModules = false } = {}) => ({
  configFile: './babel.config.js',
  only: ['./source'],
  plugins: [['@babel/transform-runtime', { useESModules }]],
  runtimeHelpers: true,
  sourceMaps: false
})

const plugins = [
  resolve(),
  commonjs({
    include: /node_modules/,
    namedExports: {
      'prop-types': ['bool', 'func', 'node', 'number', 'object', 'string'],
      'react-dom': ['createPortal']
    }
  }),
  postcss({
    extract: './dist/styles.css',
    modules: false,
    sourceMap: false
  })
]

const buildModules = [
  './source/index.js',
  './source/Controlled.js',
  './source/helpers.js'
]

const isExternal = id => !id.startsWith('.') && !id.startsWith('/')

const esm = [
  {
    input: buildModules,
    output: {
      dir: dirname(pkg.module),
      exports: 'named',
      format: 'esm',
      name: 'rmiz-esm',
      sourcemap: false
    },
    external: isExternal,
    plugins: plugins.concat(babel(getBabelOpts({ useESModules: true })))
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
      sourcemap: false
    },
    external: isExternal,
    plugins: plugins.concat(babel(getBabelOpts()))
  },
  {
    input: './source/index.js',
    output: {
      file: `${dirname(pkg.main)}/${pkg.name}.min.js`,
      exports: 'named',
      format: 'cjs',
      name: 'rmiz-cjs-min',
      sourcemap: false
    },
    external: isExternal,
    plugins: plugins.concat(babel(getBabelOpts()), terser())
  }
]

const umd = [
  {
    input: './source/index.js',
    output: {
      file: pkg.browser,
      exports: 'named',
      format: 'umd',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
      name: 'rmiz-umd',
      sourcemap: false
    },
    external: ['react', 'react-dom'],
    plugins: plugins.concat(
      babel(getBabelOpts({ useESModules: true })),
      terser()
    )
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
