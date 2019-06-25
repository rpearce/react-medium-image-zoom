const presets = [
  [
    '@babel/preset-env',
    {
      corejs: { version: 3, proposals: true },
      debug: false,
      modules: false,
      useBuiltIns: 'usage'
    }
  ],
  '@babel/preset-react'
]

const testPresets = [
  [
    '@babel/preset-env',
    {
      targets: { node: 'current' }
    }
  ],
  '@babel/preset-react'
]

const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: { version: 3, proposals: true },
      useESModules: true
    }
  ]
]

const prodPlugins = plugins.concat([
  ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }]
])

const overrides = [
  {
    test: /node_modules/,
    sourceType: 'unambiguous'
  }
]

module.exports = function(api) {
  api.cache(true)

  return {
    env: {
      development: {
        plugins,
        presets
      },
      production: {
        plugins: prodPlugins,
        presets
      },
      test: {
        presets: testPresets
      }
    },
    overrides
  }
}
