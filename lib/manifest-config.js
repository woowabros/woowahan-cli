module.exports = {
  dependencies: {
    'woowahan': '^0.2.0'
  },
  srcipts: {
    development: 'webpack-dev-server --config ./webpack.config.development.js --inline',
    production: 'webpack -p --progress --config ./webapck.config.production.js'
  },
  devDependencies: {
    'webpack': '^2.2.1',
    'webpack-dev-server': '^2.3.0',
    'babel-core': '^6.23.1',
    'babel-loader': '^6.2.5',
    'babel-preset-es2015': '^6.14.0',
    'copy-webpack-plugin': '^4.0.1',
    'css-loader': '^0.26.1',
    'handlebars': '^4.0.3',
    'handlebars-loader': '^1.1.4',
    'html-webpack-plugin': '^2.28.0',
    'style-loader': '^0.13.1'
  },

  license: 'MIT'
};
