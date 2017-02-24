var path = require('path');
var ora = require('ora');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var chalk = require('chalk');
var cliPath = path.resolve(__dirname, '..');
var recursiveReadDirectory = require('recursive-readdir');
var templatePath = path.resolve(cliPath, 'templates');

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

function displayFileList(files) {
  files.forEach(function(file) {
    console.log(chalk.green(' create ') + file.replace(templatePath + '/', ''));
  });

  console.log();
}

function copyTemplateToTargetDirectory(projectPath) {
  try {
    fs.copySync(templatePath, projectPath);
  } catch (e) {
    throw new Error(e);
  }
}

function createManifestFile(packageFilePath, packageData) {
  try {
    fs.writeJsonSync(packageFilePath, packageData);
  } catch (e) {
    throw new Error(e);
  }
}

function finishWork(CLIConfig) {
  console.log(chalk.cyan('Successfully Installed!'));
  return Promise.resolve(CLIConfig);
}

function npmInstall(CLIConfig) {
  return new Promise(function(resolve, reject) {
    var spinner = makeSpinner();

    spinner.start();
    process.chdir(CLIConfig.projectPath);
    
    exec('npm install', function(err, stdout, stderr) {
      spinner.stop();

      if (err) {
        return reject(err);
      }

      return resolve(CLIConfig);
    });
  });
}

function writeTemplateFiles(CLIConfig) {
  var packageFilePath = path.resolve(CLIConfig.projectPath, 'package.json');

  try {
    copyTemplateToTargetDirectory(CLIConfig.projectPath);
    createManifestFile(packageFilePath, CLIConfig.packageData);
    return Promise.resolve(CLIConfig);
  } catch (e) {
    return Promise.reject(e);
  }
}

function readTemplateFiles(CLIConfig) {
  return new Promise(function(resolve, reject) {
    recursiveReadDirectory(templatePath, function(err, files) {
      if (err) {
        return reject(err);
      }

      displayFileList(files);

      resolve(CLIConfig);
    });
  });
}

function prepareWork(CLIConfig) {
  console.log();
  console.log(chalk.cyan('initializing ' + CLIConfig.packageData.name + ' app'));

  return Promise.resolve(CLIConfig);
}

module.exports = {
  makeSpinner: makeSpinner,
  prepareWork: prepareWork,
  readTemplateFiles: readTemplateFiles,
  writeTemplateFiles: writeTemplateFiles,
  npmInstall: npmInstall,
  finishWork: finishWork
};
