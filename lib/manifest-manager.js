'use strict';

var readline = require('readline');
var chalk = require('chalk');
var manifestConfig = require('./manifest-config');
var packageStructure = {
	name: '',
	version: '0.0.0',
	description: '',
	main: './src/main.js',
	scripts: {
		dev: 'webpack-dev-server --config webpack.config.js --progress --inline',
		build: 'webpack --progress'
	},
	author: '',
	license: 'MIT',
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
			question : 'Name? (' + CLIConfig.projectName + ')',
			type: 'name',
			value: CLIConfig.projectName
		},
		{
			question : 'Author? ',
			type: 'author',
			value: ''
		},
		{
			question : 'Verson? (1.0.0) ',
			type: 'version',
			value: '1.0.0'
		},
		{
			question : 'Description? ',
			type: 'description',
			value: ''
		},
		{
			question : 'License? (MIT) ',
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
			
			if(askTimes > questionsArr.length - 1) {
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

		rl.on('SIGINT' , function() {
			console.log();
			console.log(chalk.red('Canceled.'));
			rl.close();
		});
	});
};