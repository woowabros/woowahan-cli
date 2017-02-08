'use strict';

const ui = require('../helpers/ui');

module.exports = CLI;

function CLI(options) {
	this.name = options.name;
	this.root = options.root;
	this.currentPath = options.currentPath;
	this.inputStream = options.inputStream;
  this.outputStream = options.outputStream;
  this.errorStream = options.errorStream;
}

function run(info) {
	let args = info.args;

	if(args.length === 0) {
		args.push('help');
	}

	this.command = args[0];

	args.shift();

	if(info.commands[this.command]) {
		return info.commands[this.command].call(this, args);
	} else {
		return ui.console(ui.red('not exist command'));
	}
}

CLI.prototype.run = run;
