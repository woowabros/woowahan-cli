var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var copy = require('copy-webpack-plugin');
var buildConfig = require('./config')[process.env.NODE_ENV].buildConfig;
var packageJson = require('./package.json');

var productionConfig = {
  devtool: buildConfig.devtool,
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
        comments: false
      },
      sourceMap: false
    }),
    new copy(
      [
        { from: 'assets' }
      ], 
      { copyUnmodified: false }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: buildConfig.appBaseTemplate,
      title: packageJson.name
    })
  ]
};

var developmentConfig = {
  devtool: buildConfig.devtool,
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
      template: buildConfig.appBaseTemplate
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

var commonConfig = {
  entry: [ buildConfig.buildEntryFile ],
  output: {
    path: path.resolve(buildConfig.buildTargetDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/ ],
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015' ]
        }
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        loader: 'handlebars-loader'
      }
    ]
  },
  plugins: []
};

module.exports = buildConfig.isProduction ? Object.assign(commonConfig, productionConfig) : Object.assign(commonConfig, developmentConfig); 
