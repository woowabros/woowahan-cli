// 색정보 링크
//https://github.com/shiena/ansicolor/blob/master/README.md
'use strict';

const colorScheme = {
	off: '\x1b[0m',
	underline: '\x1b[4m',
	bold: '\x1b[1m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m'
}
class UI {
	constructor() {
		this.text = '';
	}
	write(text) {
		process.stdout.write(text);
		return this
	}
	clear() {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		return this
	}
	spinnerStart(text) {
		let mark = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
		let current = 0;
		let marklength = mark.length;

		this.spinnerID = setInterval(() => {
			current++;
			if(current > marklength-1) current = 0;
			this.clear();
			process.stdout.write(mark[current] +" "+ text);
		}, 60)
		
	}
	spinnerStop() {
		clearInterval(this.spinnerID)
		this.clear();
	}
	console(text) {
		return console.log(text)
	}
	green(text) {
		return colorScheme['green'] + text + colorScheme['off'];
	}
	bold(text) {
		return colorScheme['bold'] + text + colorScheme['off'];
	}
	red(text) {
		return colorScheme['red'] + text + colorScheme['off'];
	}
	cyan(text) {
		return colorScheme['cyan'] + text + colorScheme['off'];
	}
	yellow(text) {
		return colorScheme['yellow'] + text + colorScheme['off'];
	}
}



module.exports = new UI();