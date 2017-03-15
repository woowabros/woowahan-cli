var path = require('path');
var Copy = require('copy-webpack-plugin');
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
	devtool: 'cheap-module-source-map',
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new Copy(
      [
        { from: 'assets' }
      ], 
      { copyUnmodified: false }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      title: packageJson.name,
      template: commonConfig.buildConfig.appBaseTemplate
    })
  ]
};

module.exports = {
	buildConfig
};
