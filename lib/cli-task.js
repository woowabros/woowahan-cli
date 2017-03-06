var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var chalk = require('chalk');
var cliPath = path.resolve(__dirname, '..');
var recursiveReadDirectory = require('recursive-readdir');
var boilerplatePath = path.resolve(cliPath, 'templates');
var utils = require('./utilities');


module.exports = {
  prepareWork: prepareWork,
  readTemplateFiles: readTemplateFiles,
  writeTemplateFiles: writeTemplateFiles,
  npmInstall: npmInstall
};

function displayFileList(files) {
  files.forEach(function(file) {
    console.log(chalk.green(' create ') + file.replace(boilerplatePath + '/', ''));
  });

  console.log();
}

function copyTemplateToTargetDirectory(projectPath) {
  try {
    fs.copySync(boilerplatePath, projectPath);
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

function npmInstall(CLIConfig) {
  return new Promise(function(resolve, reject) {
    var spinner = utils.makeSpinner();

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
    recursiveReadDirectory(boilerplatePath, function(err, files) {
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
