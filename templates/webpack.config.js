var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var copy = require('copy-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = function() {
  if(isProduction) {
    return production();
  }
  return development();
}

function production() {
  return merge(
    commonConfig,
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
  return merge(
    commonConfig,
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

var commonConfig = {
  devtool: isProduction ? 'cheap-module-source-map' : 'inline-source-map',
  entry: ['./main.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        loader: 'handlebars-loader',
      },
    ],
  }
};

function merge() {
  var obj = {}, argsCnt = arguments.length, key;

  for(var i = 0; i < argsCnt; i++) {
    for(key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
}

