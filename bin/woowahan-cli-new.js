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
var projectName = program.args[0];
var to = path.resolve('.');
var projectPath = path.resolve(to, projectName);
var cliPath = path.resolve(__dirname, '..');
var packageJson = require('../lib/packageJson');
var ora = require('ora');
// var shell = require('shelljs');
var exec = require('exec');
var recursive = require('recursive-readdir');

if(exists(to)) {
	var templatePath = path.resolve(cliPath, 'templates/app');
	
	packageJson()
		.then(function(result) {
			var customPackageObj = result;
			var targetPackage  = path.resolve(projectPath , 'package.json');
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

			if(fs.existsSync(projectPath)){
				
				console.log();
				console.log(chalk.red(projectName + ' is already existed.'));
				console.log();

			}else {
				console.log();
				console.log(chalk.cyan('initializing Woowahan App'));

				try{
					
					// 파일리스트
					recursive(templatePath, function (err, files) {
						var filesLength = files.length;

						// 파일리스트 출력
						for(var cnt =0; cnt < filesLength; cnt++) {
							var file = files[cnt].replace(templatePath+'/' , '');

							console.log(chalk.green(' create ') + file);
						}
						console.log();

						// 파일 복사
						fs.copySync(templatePath, projectPath);

						// package.json 파일 생성
						fs.writeJsonSync(targetPackage, customPackageObj);

						// npm install
						spinner.start();
						process.chdir(projectPath);

						exec('npm install', function(err, stdout, stderr) {
							if(err !== null) {
								spinner.stop();
								console.log(chalk.yellow(err));
							}
							spinner.stop();
							console.log(chalk.cyan('Successfully Installed!'));
							console.log();
						});


						// shell
						// 	.cd(projectPath)
						// 	.exec('npm install -s', {async: true}, function() {
						// 		spinner.stop();	
						// 		console.log();
						// 		console.log(chalk.cyan('Successfully Installed!'));
						// 		console.log();
						// 	})
						// 	.stderr.on('data', function(data) {
						// 		console.log(chalk.yellow(data));
						// 	});

					});
				} catch(err) {
					console.log(chalk.red('ERROR ' + err));
				}

			}	
		});
}