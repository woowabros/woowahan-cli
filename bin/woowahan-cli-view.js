#!/usr/bin/env node
'use strict';

var VIEW_NAME = 0;
var program = require('commander');
var path = require('path');
var generator = require('../lib/generate');
var validate = require('../lib/validate');
var ui = require('../lib/ui');
var viewConfig = {};

program
  .usage('view-name <option>')
  .option('-c, --collection', 'generate a collection view')
  .parse(process.argv);

if (!validate.isProjectRoot()) {
	ui.error(chalk.red('Change the current working directory to root of your project.'));
	process.exit();
}

viewConfig.name = program.args[VIEW_NAME];
viewConfig.path = path.resolve('.', 'views', viewConfig.name);
viewConfig.generate = 'views';
viewConfig.type = 'default';

if (program.collection) {
	viewConfig.type =	'collection';
}

generator(viewConfig);
