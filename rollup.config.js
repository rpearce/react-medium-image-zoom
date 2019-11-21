import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-auto-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'

const plugins = [
  external(),
  resolve({ browser: true }),
  commonjs({ include: /node_modules/ }),
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

const esm = {
  name: 'react-medium-image-zoom',
  file: './dist/index.esm.js',
  format: 'esm',
  exports: 'named',
  sourcemap: true
}

const cjs = {
  name: 'react-medium-image-zoom',
  file: './dist/index.cjs.js',
  format: 'cjs',
  exports: 'named',
  sourcemap: true
}

const config = [
  {
    input: './source/index.js',
    output: [esm, cjs],
    plugins
  }
]

export default config
