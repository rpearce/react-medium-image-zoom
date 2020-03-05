const presets = ['@babel/react', ['@babel/env', { loose: true }]]

const testPresets = [
  '@babel/react',
  ['@babel/env', { loose: true, targets: { node: 'current' } }]
]

const plugins = [['transform-react-remove-prop-types', { mode: 'wrap' }]]

module.exports = {
  env: { test: { presets: testPresets } },
  presets,
  plugins
}
