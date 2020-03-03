const presets = ['@babel/react', ['@babel/env', { loose: true }]]

const plugins = [['transform-react-remove-prop-types', { mode: 'wrap' }]]

module.exports = { presets, plugins }

//{
//  targets: { node: 'current' }
//}
