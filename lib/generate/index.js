var chalk = require('chalk');
var runViewGenerator = require('./view');
var runReducerGenerator = require('./reducer');
var ui = require('../ui');
var generateConfig = require('./config');

module.exports = function(config) {
	initGenerator(config);
	
	try {
		switch (config.generate) {
			case generateConfig.viewGenerate:
				runViewGenerator(config);
				break;
			case generateConfig.reducerGenerate:
				runReducerGenerator(config);
				break;
		}
	} catch (error) {
		config.spinner.stop();
    ui.error(chalk.red(error.message));
    process.exit();
	}

	endGenerator(config);
};

function initGenerator(config) {
  config.createdFileList = [];
  config.modifiedFileList = [];
  config.spinner = ui.makeSpinner();
  config.spinner.start();
}

function endGenerator(config) {
	config.spinner.stop();
  displayFiles(config.modifiedFileList, ' modified ');
  displayFiles(config.createdFileList, '   create ');
  console.log();
}

function displayFiles(files, type) {
  files.forEach(function(file) {
		ui.log(chalk.green(type) + file);
  });
}
