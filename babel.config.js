const presets = [
  [
    '@babel/preset-env',
    {
      targets: { node: 'current' }
    }
  ],
  '@babel/preset-react'
]

const plugins = [['transform-react-remove-prop-types', { mode: 'wrap' }]]

module.exports = { presets, plugins }
