var buildConfig = require('./config')[process.env.NODE_ENV].buildConfig;
var commonConfig = {
  entry: '',
  output: {},
  devtool: '',
  plugins: [],
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
  }
};

module.exports = Object.assign(commonConfig, buildConfig); 
