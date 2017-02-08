'use strict';

const ui = require('../helpers/ui');

class CLI {
	constructor(options) {
		this.name = options.name;
		this.root = options.root;
		this.currentPath = options.currentPath;
		this.inputStream = options.inputStream;
    this.outputStream = options.outputStream;
    this.errorStream = options.errorStream;
	}
	run(info) {
		let command;
		let args = info.args;
		if(args.length === 0) {
			args.push('help');
		}
		command = args[0];
		this.command = command;
		args.shift();
		if(info.commands[command]) {
			return info.commands[command].call(this, args);
		} else {
			return ui.console(ui.red('not exist command'));
		}
	}
}

module.exports = CLI;
