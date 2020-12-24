import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
//import typescript from '@rollup/plugin-typescript'
import typescript from 'rollup-plugin-typescript2'

const cjsConfig = {
  include: /node_modules/,
}

const buildModules = ['./source/index.ts']

const isExternal = (id) => !id.startsWith('.') && !id.startsWith('/')

const esm = [
  // ESModules (esm) build
  {
    input: buildModules,
    output: {
      dir: './dist/esm',
      exports: 'named',
      format: 'esm',
      name: 'iz-esm',
      sourcemap: false,
    },
    external: isExternal,
    plugins: [typescript({ tsconfig: './tsconfig.iife.json' })],
  },
]

const cjs = [
  // CommonJS (cjs) build
  {
    input: buildModules,
    output: {
      dir: './dist/cjs',
      exports: 'named',
      format: 'cjs',
      globals: {},
      name: 'iz-cjs',
      sourcemap: false,
    },
    external: isExternal,
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.cjs.json' }),
    ],
  },

  // Minified cjs build
  {
    input: './source/index.ts',
    output: {
      file: `./dist/cjs/image-zoom.min.js`,
      exports: 'named',
      format: 'cjs',
      name: 'iz-cjs-min',
      sourcemap: false,
    },
    external: isExternal,
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.cjs.json' }),
      terser(),
    ],
  },
]

const umd = [
  // Universal module definition (UMD) build
  {
    input: './source/index.ts',
    output: {
      file: './dist/umd/image-zoom.js',
      exports: 'named',
      format: 'umd',
      globals: {},
      name: 'iz-umd',
      sourcemap: false,
    },
    external: [],
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.umd.json' }),
    ],
  },

  // Minified (UMD) build
  {
    input: './source/index.ts',
    output: {
      file: './dist/umd/image-zoom.min.js',
      exports: 'named',
      format: 'umd',
      globals: {},
      name: 'miz-umd',
      sourcemap: false,
    },
    external: [],
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.umd.json' }),
      terser(),
    ],
  },
]

const iife = [
  {
    input: './source/index.ts',
    output: {
      file: './dist/iife/image-zoom.js',
      format: 'iife',
      name: 'imageZoom',
    },
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.iife.json' })
    ],
  },
  {
    input: './source/index.ts',
    output: {
      file: './dist/iife/image-zoom.min.js',
      format: 'iife',
      name: 'imageZoom',
    },
    plugins: [
      resolve(),
      commonjs(cjsConfig),
      typescript({ tsconfig: './tsconfig.iife.json' }),
      terser()
    ],
  },
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
  case 'iife':
    config = iife
    break
  default:
    config = cjs.concat(esm).concat(umd).concat(iife)
}

export default config
