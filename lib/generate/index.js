'use strict';

var chalk = require('chalk');
var runViewGenerator = require('./view');
var runReducerGenerator = require('./reducer');
var utils = require('../utilities');

module.exports = function(config) {
	initGenerator(config);
	
	try {
		switch (config.generate) {
			case 'views':
				runViewGenerator(config);
				break;
			case 'reducers':
				runReducerGenerator(config);
				break;
		}
	} catch (error) {
		config.spinner.stop();
    console.log();
    console.error(chalk.red(error.message));
    console.log();
	}

	endGenerator(config);
};

function initGenerator(config) {
  config.createdFileList = [];
  config.modifiedFileList = [];
  config.spinner = utils.makeSpinner();
  config.spinner.start();
}

function endGenerator(config) {
	config.spinner.stop();
  utils.displayFiles(config.modifiedFileList, ' modified ');
  utils.displayFiles(config.createdFileList, '   create ');
  console.log();
  process.exit();
}

