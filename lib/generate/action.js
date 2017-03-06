'use strict';

var fs = require('fs-extra');
var path = require('path');
var templates = require('./templates');

module.exports = function(config) {
  var actionConfig = {};

  if (config.generate === 'reducers') {
    actionConfig.name = config.actionName ? config.actionName : config.name;
    actionConfig.path = path.resolve('.', 'actions');
    actionConfig.generate = 'actions';
  }

  try {
		appendAction(actionConfig);
    config.modifiedFileList.push(path.join(actionConfig.generate, 'index.js'));
  } catch (error) {
    throw error;
  }
};

function appendAction(config) {
	var exportActionPath = path.resolve('.', config.generate, 'index.js');
	
  try {
    fs.appendFileSync(exportActionPath, templates('index.js', config, 'exportActionJs'));
  } catch (error) {
    throw new Error(error);
  }
}
