import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-auto-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const plugins = [
  resolve(),
  commonjs({
    include: /node_modules/,

    // https://github.com/rollup/rollup-plugin-commonjs/issues/407#issuecomment-527837831
    namedExports: {
      react: Object.keys(React),
      'react-dom': Object.keys(ReactDOM),
      'prop-types': Object.keys(propTypes)
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

const pluginsWithExternal = [external(), ...plugins]

const config = [
  {
    input: [
      './source/index.js',
      './source/helpers.js',
      './source/Uncontrolled.js',
      './source/Controlled.js'
    ],
    output: [
      {
        dir: './dist/esm',
        exports: 'named',
        format: 'esm',
        name: 'rmiz-esm',
        sourcemap: true
      },
      {
        dir: './dist/cjs',
        exports: 'named',
        format: 'cjs',
        name: 'rmiz-cjs',
        sourcemap: true
      }
    ],
    plugins: pluginsWithExternal
  },
  {
    input: './source/index.js',
    output: [
      {
        file: pkg.browser,
        exports: 'named',
        format: 'umd',
        name: 'rmiz-umd',
        sourcemap: true
      }
    ],
    plugins
  }
]

export default config
