'use strict';

var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var createAction = require('./action');
var templates = require('./templates');

module.exports = function(config) {
  if (fs.existsSync(path.resolve(config.path, `${config.name}.js`))) {
    throw new Error(chalk.red(`${config.name} ${config.generate} already existed!`));
  }

  try {
		createReducer(config);
    createAction(config);
    exportCreatedReducer(config);
  } catch (error) {
    throw error;
  }
};

function createReducer(config) {
	var fileSets = [ `${config.name}.js` ];

	config.createdFileList = createFiles(config.path, fileSets, config);
}

function exportCreatedReducer(config) {
  var exportjSPath = path.resolve('.', config.generate, 'index.js');

  try {
    fs.appendFileSync(exportjSPath, templates('index.js', config, 'exportJs'));
    config.modifiedFileList.push(path.join(config.generate, 'index.js'));
  } catch (error) {
    config.spinner.stop();
    throw new Error(error);
  }
}

function createFiles(targetPath, fileList, config) {
  var createdFileList = [];

  fileList.forEach(function(file) {
    try {
      var fileTemplate;
      var filePath = path.resolve(targetPath, file);
      var createdFile;
      
      fileTemplate = templates(file, config, 'reducerJs');
      createdFile = path.join(config.generate, file);
      fs.writeFileSync(filePath, fileTemplate);
      createdFileList.push(createdFile);
    } catch (error) {
      throw new Error(error);
    }
  });
  return createdFileList;
}
