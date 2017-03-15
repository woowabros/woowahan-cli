#!/usr/bin/env node
'use strict';

var REDUCER_NAME = 0;
var ACTION_NAME = 1;
var program = require('commander');
var chalk = require('chalk');
var path = require('path');
var generator = require('../lib/generate');
var validate = require('../lib/validate');
var ui = require('../lib/ui');
var reducerConfig = {};

program
  .usage('reducer-name <action-name>')
  .parse(process.argv);

if (!validate.isProjectRoot()) {
	ui.error(chalk.red('Change the current working directory to root of your project.'));
	process.exit();
}

if (!program.args[ACTION_NAME]) {
  ui.error(`woowahan-cli reducer ${program.args[REDUCER_NAME]} ${chalk.red('"ActionName" (Required)')}`);
  process.exit();
}

reducerConfig.name = program.args[REDUCER_NAME];
reducerConfig.actionName = program.args[ACTION_NAME];
reducerConfig.path = path.resolve('.', 'reducers');
reducerConfig.generate = 'reducers';

generator(reducerConfig);
