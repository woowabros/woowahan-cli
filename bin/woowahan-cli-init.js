#!/usr/bin/env node
'use strict';

var program = require('commander');

program
	.usage('[project-name] <option>')
	.parse(process.argv);

var path = require('path');
var exists = require('fs').existsSync;
var fs = require('fs-extra');
var chalk = require('chalk');
var to = path.resolve('.');
var cliPath = path.resolve(__dirname, '..');
var packageJson = require('../lib/packageJson');
var ora = require('ora');
var exec = require('exec');
var recursiveReadDirectory = require('recursive-readdir');

if(exists(to)) {
	var templatePath = path.resolve(cliPath, 'templates/app');
	
	packageJson()
		.then(function(result) {
			var customPackageObj = result;
			var targetPackage  = path.resolve(to , 'package.json');
			var spinner = ora({
				text: '',
				spinner: {
					interval: 100,
					frames: [
						'⠄ NPM Installing .',
						'⠆ NPM Installing ..',
						'⠇ NPM Installing ...',
						'⠋ NPM Installing ....',
						'⠙ NPM Installing .....',
						'⠸ NPM Installing ......',
						'⠰ NPM Installing .......',
						'⠠ NPM Installing ......',
						'⠰ NPM Installing .....',
						'⠸ NPM Installing ....',
						'⠙ NPM Installing ...',
						'⠋ NPM Installing ..',
						'⠇ NPM Installing .',
						'⠆ NPM Installing '
					]
				}
			});

			console.log();
			console.log(chalk.cyan('initializing Woowahan App'));

			try{

				recursiveReadDirectory(templatePath, function (err, files) {
					var filesLength = files.length;

					for(var cnt =0; cnt < filesLength; cnt++) {
						var file = files[cnt].replace(templatePath+'/' , '');

						console.log(chalk.green(' create ') + file);
					}
					console.log();

					fs.copySync(templatePath, to);

					fs.writeJsonSync(targetPackage, customPackageObj);

					spinner.start();

					exec('npm install', function(err, stdout, stderr) {
						if(err !== null) {
							spinner.stop();
							console.log(chalk.yellow(err));
						}
						spinner.stop();
						console.log(chalk.cyan('Successfully Installed!'));
						console.log();
					});

				});
			} catch(err) {
				console.log(chalk.red('ERROR ' + err));
			}
		});
}