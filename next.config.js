module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|svg|jpg|gif|pdf)$/,
      use: [ 'file-loader' ]
    })
    config.output.globalObject = 'this'

    return config
  },
}
