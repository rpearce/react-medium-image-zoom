import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { dirname } from 'path'
import React from 'react'
import reactDom from 'react-dom'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const postCssConfig = {
  extract: './dist/styles.css',
  modules: false,
  sourceMap: false
}

const cjsConfig = {
  include: /node_modules/,
  namedExports: {
    react: Object.keys(React),
    'react-dom': Object.keys(reactDom)
  }
}

const buildModules = [
  './source/index.ts',
  './source/Controlled.tsx',
  './source/helpers.ts'
]

const isExternal = id => !id.startsWith('.') && !id.startsWith('/')

const esm = [
  // ESModules (esm) build
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
    plugins: [
      resolve(),
      postcss(postCssConfig),
      typescript({ tsconfig: './tsconfig.build.json' })
    ]
  }
]

const cjs = [
  // CommonJS (cjs) build
  {
    input: buildModules,
    output: {
      dir: dirname(pkg.main),
      exports: 'named',
      format: 'cjs',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
      name: 'rmiz-cjs',
      sourcemap: false
    },
    external: isExternal,
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      postcss(postCssConfig),
      typescript({ tsconfig: './tsconfig.build.json' })
    ]
  },

  // Minified cjs build
  {
    input: './source/index.ts',
    output: {
      file: `${dirname(pkg.main)}/${pkg.name}.min.js`,
      exports: 'named',
      format: 'cjs',
      name: 'rmiz-cjs-min',
      sourcemap: false
    },
    external: isExternal,
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      postcss(postCssConfig),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser()
    ]
  }
]

const umd = [
  // Universal module definition (UMD) build
  {
    input: './source/index.ts',
    output: {
      file: './dist/umd/react-medium-image-zoom.js',
      exports: 'named',
      format: 'umd',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
      name: 'rmiz-umd',
      sourcemap: false
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.build.json' }),
      postcss(postCssConfig)
    ]
  },

  // Minified (UMD) build
  {
    input: './source/index.ts',
    output: {
      file: './dist/umd/react-medium-image-zoom.min.js',
      exports: 'named',
      format: 'umd',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
      name: 'rmiz-umd',
      sourcemap: false
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      postcss(postCssConfig),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser()
    ]
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
