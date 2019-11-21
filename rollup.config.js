import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-auto-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'

const plugins = [
  external(),
  resolve(),
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
  dir: './dist/esm',
  exports: 'named',
  format: 'esm',
  name: 'react-medium-image-zoom',
  sourcemap: true
}

const cjs = {
  dir: './dist/cjs',
  exports: 'named',
  format: 'cjs',
  name: 'react-medium-image-zoom',
  sourcemap: true
}

const config = [
  {
    input: ['./source/index.js', './source/Uncontrolled.js'],
    output: [esm, cjs],
    plugins
  }
]

export default config
