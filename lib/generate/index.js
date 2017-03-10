var chalk = require('chalk');
var runViewGenerator = require('./view');
var runReducerGenerator = require('./reducer');
var ui = require('../ui');
var config = require('../config');

module.exports = function(cliConfig) {
	initGenerator(cliConfig);
	
	try {
		switch (cliConfig.generate) {
			case config.VIEW_GENERTATE:
				runViewGenerator(cliConfig);
				break;
			case config.REDUCER_GENERATE:
				runReducerGenerator(cliConfig);
				break;
		}
	} catch (error) {
		cliConfig.spinner.stop();
    ui.error(chalk.red(error.message));
    process.exit();
	}

	endGenerator(cliConfig);
};

function initGenerator(cliConfig) {
  cliConfig.createdFileList = [];
  cliConfig.modifiedFileList = [];
  cliConfig.spinner = ui.makeSpinner();
  cliConfig.spinner.start();
}

function endGenerator(cliConfig) {
	cliConfig.spinner.stop();
  displayFiles(cliConfig.modifiedFileList, ' modified ');
  displayFiles(cliConfig.createdFileList, '   create ');
  console.log();
}

function displayFiles(files, type) {
  files.forEach(function(file) {
		ui.log(chalk.green(type) + file);
  });
}
