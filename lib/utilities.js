'use strict';

var ora = require('ora');
var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');

module.exports = {
	makeSpinner: makeSpinner,
  checkIsRootofProject: checkIsRootofProject,
  displayFiles: displayFiles
};

function checkIsRootofProject() {
  var hasPackageJson = fs.existsSync(path.resolve('.', 'package.json'));
  var isRoot = fs.existsSync(path.resolve('.', 'main.js'));

  if (!hasPackageJson && !isRoot) {
    console.log();
    console.log(chalk.red('Change the current working directory to root of your project.'));
    console.log();

    process.exit();
  }
}

function makeSpinner() {
  return ora({
    text: '',
    spinner: {
      interval: 100,
      frames: [
        '⠄ NPM Installing .',
        '⠆ NPM Installing ..',
        '⠇ NPM Installing ...',
        '⠋ NPM Installing ....',
        '⠙ NPM Installing .....',
        '⠸ NPM Installing ......',
        '⠰ NPM Installing .......',
        '⠠ NPM Installing ......',
        '⠰ NPM Installing .....',
        '⠸ NPM Installing ....',
        '⠙ NPM Installing ...',
        '⠋ NPM Installing ..',
        '⠇ NPM Installing .',
        '⠆ NPM Installing '
      ]
    }
  });
}

function displayFiles(files, type) {
  files.forEach(function(file) {
    console.log(chalk.green(type) + file);
  });
}
