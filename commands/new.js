'use strict';

const path = require('path');
const getFileList = require('../helpers/get-file-list');
const InitCommands = require('./init');

module.exports = function(args){
	const projectName = args[0];
	
	this.currentPath = path.join(this.currentPath , projectName);
	this.message = 'New Woowahan App Created.';
	args.shift();
	InitCommands.call(this, args);
}
