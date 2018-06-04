const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (webpackConfig, env) => {
  const production = env === 'production'
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash].js'
  webpackConfig.output.publicPath = "https://s3-ap-southeast-1.amazonaws.com/aws-business-static/resource/"
  //webpackConfig.output.publicPath = "/"


  webpackConfig.plugins = webpackConfig.plugins.concat([
   
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendor','manifest'], // 上面入口定义的节点组
  }),
  ])


  return webpackConfig
}
