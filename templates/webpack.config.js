var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var copy = require('copy-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';
var webpackConfigCommon = require('./webpack.config.common');

module.exports = function() {
  if(isProduction) {
    return production();
  }
  return development();
}

function production() {
  return webpackConfigCommon.merge(
    webpackConfigCommon.config,
    {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            screw_ie8: true,
            warnings: false
          },
          output: {
            comments: false,
          },
          sourceMap: false
        }),

        new copy([
          { from: 'assets' }
        ], { copyUnmodified: false }),

        new HtmlWebpackPlugin({
          inject: true,
          template: './index.html',
        })
      ]
    }
  );
}

function development() {
  return webpackConfigCommon.merge(
    webpackConfigCommon.config,
    {
       plugins: [
         new webpack.DefinePlugin({
           'process.env': {
             'NODE_ENV': JSON.stringify('development')
           }
         }),
         new copy([
           { from: 'assets' }
         ], { copyUnmodified: false }),

         new HtmlWebpackPlugin({
           inject: true,
           template: './index.html',
         }),
         new webpack.HotModuleReplacementPlugin(),
       ]
     }
  );
}
