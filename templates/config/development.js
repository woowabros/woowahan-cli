var path = require('path');
var copy = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var packageJson = require('../package.json');
var commonConfig = require('./common');

var buildConfig = {
	entry: commonConfig.buildConfig.buildEntryFile,
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
	devtool: 'inline-source-map',
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new copy(
      [
        { from: 'assets' }
      ], 
      { copyUnmodified: false }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      title: packageJson.name,
      template: commonConfig.buildConfig.appBaseTemplate
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = {
	buildConfig
};
