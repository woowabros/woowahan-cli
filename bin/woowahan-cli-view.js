#!/usr/bin/env node
'use strict';

var VIEW_NAME = 0;
var program = require('commander');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var viewGenerator = require('../lib/view-generator');
var viewConfig = {};
var hasPackageJson = fs.existsSync(path.resolve('.', 'package.json'));
var hasViewDirectory = fs.existsSync(path.resolve('.', 'views'));

program
  .usage('view-name <option>')
  .option('-c, --collection', 'generate a collection view')
  .parse(process.argv);

if (!hasPackageJson && !hasViewDirectory) {
	console.log();
	console.log(chalk.red('Change the current working directory to root of your project.'));
	console.log();

	process.exit();
}

viewConfig.viewName = program.args[VIEW_NAME];
viewConfig.viewPath = path.resolve('.', 'views', viewConfig.viewName);
viewConfig.viewType = 'default';

if (program.collection) {
	viewConfig.viewType =	'collection';
}

viewGenerator(viewConfig);
