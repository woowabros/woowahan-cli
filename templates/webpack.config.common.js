var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  config: objectMerge({
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
  }),
  merge: objectMerge
}

function objectMerge() {
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
