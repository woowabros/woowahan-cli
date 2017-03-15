var readline = require('readline');
var chalk = require('chalk');
var manifestConfig = require('./config').MENIFEST;
var packageStructure = {
	name: '',
	version: manifestConfig.version,
	description: '',
	main: manifestConfig.main,
	scripts: {
		dev: manifestConfig.srcipts.development,
		build: manifestConfig.srcipts.production
	},
	author: '',
	license: manifestConfig.license,
	repository: {
		type: 'git',
		url: ''
	},
	dependencies: manifestConfig.dependencies,
	devDependencies: manifestConfig.devDependencies
};

module.exports = function(CLIConfig) {
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	var questionsArr = [
		{
			question: 'Name? (' + CLIConfig.projectName + ')',
			type: 'name',
			value: CLIConfig.projectName
		},
		{
			question: 'Author? ',
			type: 'author',
			value: ''
		},
		{
			question: 'Verson? (1.0.0) ',
			type: 'version',
			value: '1.0.0'
		},
		{
			question: 'Description? ',
			type: 'description',
			value: ''
		},
		{
			question: 'License? (MIT) ',
			type: 'license',
			value: 'MIT'
		}
	];
	
	return new Promise(function(resolve, reject) {
		var askTimes = 0;
		var question = questionsArr[askTimes]['question'];
		var type = questionsArr[askTimes]['type'];
		var value = questionsArr[askTimes]['value'];

		rl.setPrompt(question);
		rl.prompt();

		rl.on('line', function(line) {
			packageStructure[type] = line !== '' ? line : value;
			askTimes++;
			
			if (askTimes > questionsArr.length - 1) {
				rl.close();

        CLIConfig.packageData = packageStructure;

				return resolve(CLIConfig);
			}

			question = questionsArr[askTimes]['question'];
			type = questionsArr[askTimes]['type'];
			value = questionsArr[askTimes]['value'];
			
			rl.setPrompt(question);
			rl.prompt();
		});

		rl.on('SIGINT', function() {
			console.log();
			console.log(chalk.red('Canceled.'));
			rl.close();
		});
	});
};
