const presets = ['@babel/preset-env', '@babel/preset-react']

const testPresets = [
  [
    '@babel/preset-env',
    {
      targets: { node: 'current' }
    }
  ],
  '@babel/preset-react'
]

module.exports = function(api) {
  api.cache(true)

  return {
    env: {
      development: { presets },
      production: { presets },
      test: { presets: testPresets }
    }
  }
}
