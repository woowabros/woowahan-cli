'use strict';

var readline = require('readline');
var chalk = require('chalk');
var packageJson = {
	'name': '',
	'version': '0.0.0',
	'description': 'Woowahan Cli App',
	'main': './src/main.js',
	'scripts': {
		'dev': 'webpack-dev-server --config webpack.config.js --progress --inline',
		'build': 'webpack --progress'
	},
	'author': '',
	'license': 'MIT',
	'repository': {
		'type': 'git',
		'url': ''
	},
	'dependencies': {
		'woowahan': '^0.2.0',
		'bootstrap-sass': '^3.3.7'
	},
	'devDependencies': {
		'babel-core': '^6.14.0',
		'babel-eslint': '^6.1.2',
		'babel-loader': '^6.2.5',
		'babel-preset-es2015': '^6.14.0',
		'babel-preset-stage-2': '^6.13.0',
		'bootstrap-loader': '^2.0.0-beta.20',
		'css-loader': '^0.26.1',
		'extract-text-webpack-plugin': '^2.0.0-beta',
		'file-loader': '^0.10.0',
		'handlebars': '^4.0.3',
		'handlebars-loader': '^1.1.4',
		'html-webpack-plugin': '^2.28.0',
		'imports-loader': '^0.7.0',
		'node-sass': '^4.3.0',
		'resolve-url-loader': '^1.6.1',
		'sass-loader': '^5.0.0',
		'style-loader': '^0.13.1',
		'url-loader': '^0.5.7',
		'webpack': '^2.2.1',
		'webpack-dev-server': '^2.3.0'
	}
};

module.exports = function() {
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	var questionsArr = [
		{
			question : 'Name? (WoowahanApp) ',
			type: 'name',
			value: 'WoowahanApp'
		},
		{
			question : 'Author? (WoowahanApp) ',
			type: 'author',
			value: 'Woowahan Bros'
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

			packageJson[type] = line !== '' ? line : value;
			askTimes++;
			
			if(askTimes > questionsArr.length - 1) {
				rl.close();
				return resolve(packageJson);
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