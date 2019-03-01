const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const PrettierPlugin = require('prettier-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new PrettierPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },
})
