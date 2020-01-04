import { dirname } from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-auto-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const plugins = [
  resolve(),
  external(),
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

const config = [
  {
    input: [
      './source/index.js',
      './source/helpers.js',
      './source/Uncontrolled.js',
      './source/UncontrolledActivated.js',
      './source/Controlled.js',
      './source/ControlledActivated.js'
    ],
    output: [
      {
        dir: dirname(pkg.module),
        exports: 'named',
        format: 'esm',
        name: 'rmiz-esm',
        sourcemap: true
      },
      {
        dir: dirname(pkg.main),
        exports: 'named',
        format: 'cjs',
        name: 'rmiz-cjs',
        sourcemap: true
      }
    ],
    plugins
  },
  {
    input: './source/index.js',
    output: [
      {
        file: pkg.browser,
        exports: 'named',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'reactDom',
          'prop-types': 'propTypes',
          'react-use/lib/useEvent': 'useEvent',
          'react-use/lib/usePrevious': 'usePrevious',
          'react-use/lib/useWindowSize': 'useWindowSize'
        },
        name: 'rmiz-umd',
        sourcemap: true
      }
    ],
    plugins
  }
]

export default config
