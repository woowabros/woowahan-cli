var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var createAction = require('./action');
var templates = require('./templates');
var generateConfig = require('./config');

module.exports = function(config) {
  if (fs.existsSync(path.resolve(config.path, `${config.name}.js`))) {
    throw new Error(chalk.red(`'${config.name}' ${config.generate} existed!`));
  }

  validateAction(config);
	createReducer(config);
  createAction(config);
  exportCreatedReducer(config);
};

function validateAction(config) {
  var exportjSPath = path.resolve('.', generateConfig.actionPath, generateConfig.indexJs);
  var currentActions = fs.readFileSync(exportjSPath, 'utf8');

  if (currentActions.indexOf(config.actionName) > 0) {
    throw new Error(`'${config.actionName}' action is existed!`);
  }
}

function createReducer(config) {
	var fileSets = [ `${config.name}.js` ];

	config.createdFileList = createFiles(config.path, fileSets, config);
}

function exportCreatedReducer(config) {
  var exportjSPath = path.resolve('.', generateConfig.reducerPath, generateConfig.indexJs);

  try {
    config.type = generateConfig.fileExport;
    fs.appendFileSync(exportjSPath, templates(generateConfig.indexJs, config));
    config.modifiedFileList.push(path.join(generateConfig.reducerPath, generateConfig.indexJs));
  } catch (error) {
    config.spinner.stop();
    throw error;
  }
}

function createFiles(targetPath, fileList, config) {
  var createdFileList = [];

  fileList.forEach(function(file) {
    try {
      var fileTemplate;
      var filePath = path.resolve(targetPath, file);
      var createdFile;
      
      fileTemplate = templates(file, config);
      createdFile = path.join(generateConfig.reducerPath, file);
      fs.writeFileSync(filePath, fileTemplate);
      createdFileList.push(createdFile);
    } catch (error) {
      throw error;
    }
  });
  return createdFileList;
}
