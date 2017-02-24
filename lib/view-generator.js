'use strict';
const VIEW_DIR = 'views';
var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var makeSpinner = require('./cli-task').makeSpinner;
var cliTemplates = require('./cli-templates');

module.exports = function(viewConfig) {
  viewConfig.createdFileList = [];
  viewConfig.modifiedFileList = [];

  startViewGenerate(viewConfig).then(function(viewConfig) {
    return endViewGenerate(viewConfig);
  })
  .catch(function(err) {
    if (err.spinner) {
      err.spinner.stop();  
    }

    console.log();
    console.error(chalk.red(err.message));
    console.log();
  });
};

function startViewGenerate(viewConfig) {
  return new Promise(function(resolve, reject) {
    if (fs.existsSync(viewConfig.viewPath)) {
      return reject({
        message: viewConfig.viewName + ' view already existed!'
      });
    }
    
    var spinner = makeSpinner();

    viewConfig.spinner = spinner;
    viewConfig.spinner.start();

    try {
      createView(viewConfig);
      exportCreatedView(viewConfig);  
      resolve(viewConfig);
    } catch (e) {
      reject({
        message: Error(e),
        spinner: viewConfig.spinner
      });
    }
  });
}

function createView(viewConfig) {
  var directorySets = {
    default: [ viewConfig.viewPath ],
    collection: [ viewConfig.viewPath, path.resolve(viewConfig.viewPath, 'row-item') ]
  };
  var fileSets = {
    default: [ 'index.js', 'index.hbs' ],
    collection: [ 'index.js', 'index.hbs', 'row-item/index.js', 'row-item/index.hbs' ]
  };
  
  directorySets[viewConfig.viewType].forEach(function(dir) {
    try {
      fs.mkdirSync(dir);
    } catch (e) {
      throw new Error(e);
    }
  });

  fileSets[viewConfig.viewType].forEach(function(file) {
    try {
      fs.writeFileSync(path.resolve(viewConfig.viewPath, file), cliTemplates(viewConfig, file));
      viewConfig.createdFileList.push(path.join(VIEW_DIR, viewConfig.viewName, file));
    } catch (e) {
      throw new Error(e);
    }
  });
}

function exportCreatedView(viewConfig) {
  var exportjSPath = path.resolve('.', VIEW_DIR, 'index.js');

  try {
    fs.appendFileSync(exportjSPath, cliTemplates(viewConfig, 'index.js', 'exportJs'));
    viewConfig.modifiedFileList.push(path.join(VIEW_DIR, 'index.js'));
  } catch (e) {
    throw new Error(e);
  }
}

function endViewGenerate(viewConfig) {
  viewConfig.spinner.stop();
  viewConfig.modifiedFileList.forEach(function(file) {
    console.log(chalk.green(' modified ') + file);
  });
  viewConfig.createdFileList.forEach(function(file) {
    console.log(chalk.green('  created ') + file);
  });
}
