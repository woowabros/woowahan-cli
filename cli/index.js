'use strict';

const path = require('path');
const fs = require('fs');
const CLI = require('./cli');
const commands = require('../commands/commands');

module.exports = function(options){
	const rootPath = path.resolve(__dirname, '..');
	
	let cli = new CLI({
		name: 'woowahan-cli',
		root: rootPath,
		currentPath: options.currentPath,
		inputStream: options.inputStream,
    outputStream: options.outputStream,
    errorStream: options.errorStream
	});
	
	cli.run({
		args: options.cliArgs,
    commands
	})
	
}
