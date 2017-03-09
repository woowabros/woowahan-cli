module.exports = {
  dependencies: {
    'woowahan': '^0.2.0'
  },
  srcipts: {
    development: 'NODE_ENV=development ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config ./webpack.config.js --inline',
    production: 'NODE_ENV=production ./node_modules/webpack/bin/webpack.js --progress --config ./webpack.config.js'
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
  license: 'MIT',
  main: './main.js',
  version: '0.0.0'
};
