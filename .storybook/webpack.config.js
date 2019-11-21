module.exports = async ({ config }) => {
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.css$/'
  )

  config.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  })

  return config
}
