const path = require('path')

module.exports = async ({ config }) => {
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.css$/'
  )

  config.module.rules.push({
    oneOf: [
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'postcss-loader'
        ],
        include: path.resolve(__dirname, '../')
      }
    ]
  })

  return config
}
