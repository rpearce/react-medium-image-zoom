const presets = [
  [
    '@babel/preset-env',
    {
      targets: { node: 'current' }
    }
  ],
  '@babel/preset-react'
]

module.exports = { presets }
