#!/usr/bin/env node
'use strict';

var program = require('commander');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var viewGenerator = require('../lib/view-generator');
var isCollectionView = false;
const VIEW_NAME = 0;
var VIEWConfig = {};

program
  .usage('[view-name] <option>')
  .option('-c, --collection', 'generate a collection view')
  .parse(process.argv);

VIEWConfig.viewName = program.args[VIEW_NAME];
VIEWConfig.appRootPath = getAppRootPath(path.resolve('.'));
VIEWConfig.viewPath = path.resolve(VIEWConfig.appRootPath, 'views/'+ VIEWConfig.viewName);
VIEWConfig.isCollectionView = isCollectionView;

if(program.args.collection) {
	VIEWConfig.isCollectionView = true;
}
if(VIEWConfig.appRootPath === "") {
	return console.log(chalk.red('Change your current working directory.'));
}

Promise.resolve(VIEWConfig)
	.then(viewGenerator.beforeGenerating)
	.then(viewGenerator.startGenerating)
	.then(viewGenerator.endGenerating)

function getAppRootPath(currentPath) {
	if(process.env.HOME === currentPath) return '';

	var packageJson = path.resolve(currentPath, 'package.json');
	
	if(fs.existsSync(packageJson)) {
		var config = require(packageJson);

		if(currentPath.split('/').pop() === config.name) {
			return currentPath;
		}
	}else {
		var currentPathArr = currentPath.split('/');

		currentPathArr.pop();
		return getAppRootPath(currentPathArr.join('/'))
	}
}