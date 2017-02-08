'use strict';

const ui = require('../helpers/ui');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

module.exports = function(targetPath){
	

	let packageJson = path.join(targetPath, 'package.json');
	
	if (!fs.existsSync(packageJson)) {
		ui.console(ui.yellow('Skipping npm install: package.json not found.'));
		return Promise.resolve();
	}
	ui.spinnerStart('installing packages...');
	return new Promise((resolve, reject) => {

		return fs.readFile(packageJson, 'utf8', (err, data) => {
			resolve(JSON.parse(data))
		})		
	}).then((result) => {
		process.chdir( targetPath );

		new Promise((resolve, reject) => {
			let packageInstall = spawn('npm', ['install']);	

			packageInstall.stdout.on('data', (data) => {
			  resolve(true)
			});

			packageInstall.stderr.on('data', (data) => {
				ui.console(ui.yellow(data));
			});
		}).then(() => {
			ui.spinnerStop();
			ui.console(ui.green('Successfully installed!'));
		})
	})
}