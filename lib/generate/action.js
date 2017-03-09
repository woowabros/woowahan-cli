var fs = require('fs-extra');
var path = require('path');
var templates = require('./templates');
var generateConfig = require('./config');

module.exports = function(config) {
  var actionConfig = {};

  if (config.generate === generateConfig.reducerGenerate) {
    actionConfig.name = config.actionName ? config.actionName : config.name;
    actionConfig.path = path.resolve('.', generateConfig.actionPath);
    actionConfig.generate = generateConfig.actionGenerate;
    actionConfig.type = generateConfig.fileExport;
  }

	appendAction(actionConfig);
  config.modifiedFileList.push(path.join(actionConfig.generate, generateConfig.indexJs));
};

function appendAction(config) {
	var exportActionPath = path.resolve('.', config.generate, generateConfig.indexJs);
	
  try {
    fs.appendFileSync(exportActionPath, templates(generateConfig.indexJs, config));
  } catch (error) {
    throw error;
  }
}
