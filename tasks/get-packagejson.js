'use strict'

const readline = require('readline');

module.exports = function() {
	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	
	let questions = {
		init: 'Initailize package.json file? (y/n)  ',
		name: 'Name? (WoowahanApp) ',
		author: 'Author?  ',
		license: 'license? (MIT) '
	}

	let questionsArr = ['init','name','author','license'];
	let packageObj = {}
	return new Promise((resolve, reject) => {
		let askTimes = 0;
		let askType = questionsArr[askTimes];
		rl.setPrompt(questions[askType]);
		rl.prompt();

		rl.on('line', (line) => {
			if(askType === 'init' && (line.toLowerCase() !== 'y' && line.toLowerCase() !== 'n')) {
				
			}else {
				if(askType === 'init' && line.toLowerCase() === 'n') {
					rl.close();
					return resolve(packageObj)
				}
				if(line !== '') {
					packageObj[askType] = line;	
				}
				
				askTimes++;
				askType = questionsArr[askTimes];
				if(askTimes > questionsArr.length - 1) {
					rl.close();
					return resolve(packageObj)
				}	
			}
			
			rl.setPrompt(questions[askType]);
			rl.prompt();
		})
		
	});
}