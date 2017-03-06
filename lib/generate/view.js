'use strict';

var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var templates = require('./templates');

module.exports = function(config) {
  if (fs.existsSync(config.path)) {
    throw new Error(chalk.red(`${config.name} ${config.generate} already existed!`));
  }

  try {
    createView(config);
    exportCreatedView(config);
  } catch (error) {
    throw error;
  }
};

function createView(config) {
  var viewPath = config.path;
  var itemViewPath = path.resolve(config.path, 'row-item');
  var directorySets = {
    default: [ viewPath ],
    collection: [ viewPath, itemViewPath ]
  };
  var fileSets = {
    default: [ 'index.js', 'index.hbs' ],
    collection: [ 'index.js', 'index.hbs', 'row-item/index.js', 'row-item/index.hbs' ]
  };

  createDirectories(directorySets[config.type]);
  config.createdFileList = createFiles(config.path, fileSets[config.type], config);
}

function exportCreatedView(config) {
  var exportjSPath = path.resolve('.', config.generate, 'index.js');

  try {
    fs.appendFileSync(exportjSPath, templates('index.js', config, 'exportJs'));
    config.modifiedFileList.push(path.join(config.generate, 'index.js'));
  } catch (error) {
    config.spinner.stop();
    throw new Error(error);
  }
}

function createDirectories(directoryList) {
  directoryList.forEach(function(dir) {
    try {
      fs.mkdirSync(dir);
    } catch (error) {
      throw new Error(error);
    }
  });
}

function createFiles(targetPath, fileList, config) {
  var createdFileList = [];

  fileList.forEach(function(file) {
    try {
      var fileTemplate;
      var filePath = path.resolve(targetPath, file);
      var createdFile;
      
      fileTemplate = templates(file, config);
      createdFile = path.join(config.generate, config.name, file);
      fs.writeFileSync(filePath, fileTemplate);
      createdFileList.push(createdFile);
    } catch (error) {
      throw new Error(error);
    }
  });
  return createdFileList;
}
