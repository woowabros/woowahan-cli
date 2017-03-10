var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var createAction = require('./action');
var templates = require('./templates');
var config = require('../config');
var validate = require('../validate');

module.exports = function(reducerConfig) {
  if (validate.isExist(path.resolve(reducerConfig.path, `${reducerConfig.name}.js`))) {
    throw new Error(chalk.red(`'${reducerConfig.name}' existe!`));
  }

  validateAction(reducerConfig);
	createReducer(reducerConfig);
  createAction(reducerConfig);
  exportCreatedReducer(reducerConfig);
};

function validateAction(reducerConfig) {
  var exportjSPath = path.resolve('.', config.ACTION_PATH, config.INDEX_JS);
  var currentActions = fs.readFileSync(exportjSPath, 'utf8');

  if (currentActions.indexOf(reducerConfig.actionName) > 0) {
    throw new Error(`'${reducerConfig.actionName}' exist!`);
  }
}

function createReducer(reducerConfig) {
	var fileSets = [ `${reducerConfig.name}.js` ];

	reducerConfig.createdFileList = createFiles(reducerConfig.path, fileSets, reducerConfig);
}

function exportCreatedReducer(reducerConfig) {
  var exportjSPath = path.resolve('.', config.REDUCER_PATH, config.INDEX_JS);

  try {
    reducerConfig.type = config.FILE_EXPORT;
    fs.appendFileSync(exportjSPath, templates(config.INDEX_JS, reducerConfig));
    reducerConfig.modifiedFileList.push(path.join(config.REDUCER_PATH, config.INDEX_JS));
  } catch (error) {
    reducerConfig.spinner.stop();
    throw error;
  }
}

function createFiles(targetPath, fileList, reducerConfig) {
  var createdFileList = [];

  fileList.forEach(function(file) {
    try {
      var fileTemplate;
      var filePath = path.resolve(targetPath, file);
      var createdFile;
      
      fileTemplate = templates(file, reducerConfig);
      createdFile = path.join(config.REDUCER_PATH, file);
      fs.writeFileSync(filePath, fileTemplate);
      createdFileList.push(createdFile);
    } catch (error) {
      throw error;
    }
  });
  return createdFileList;
}
