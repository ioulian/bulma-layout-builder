const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const config = require('./package.json').config

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.png'),
      prefix: 'icons/',
      emitStats: false,
      statsFilename: 'iconstats.json',
      persistentCache: true,
      inject: true,
      background: config.theme,
      title: config.name,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true,
      },
    }),
  ],
})
