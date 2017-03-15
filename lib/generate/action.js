var fs = require('fs-extra');
var path = require('path');
var templates = require('./templates');
var config = require('../config');

module.exports = function(actionConfig) {
  var actionConfigTemp = {};

  if (actionConfig.generate === config.REDUCER_GENERATE) {
    actionConfigTemp.name = actionConfig.actionName;
    actionConfigTemp.path = path.resolve('.', config.ACTION_PATH);
    actionConfigTemp.generate = config.ACTION_GENERATE;
    actionConfigTemp.type = config.FILE_EXPORT;
  }
  
	appendAction(actionConfigTemp);
  actionConfig.modifiedFileList.push(path.join(actionConfigTemp.generate, config.INDEX_JS));
};

function appendAction(actionConfig) {
	var exportActionPath = path.resolve('.', actionConfig.generate, config.INDEX_JS);
	
  try {
    fs.appendFileSync(exportActionPath, templates(config.INDEX_JS, actionConfig));
  } catch (error) {
    throw error;
  }
}
