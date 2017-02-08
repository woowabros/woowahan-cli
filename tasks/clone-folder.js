'use strict';

const fs = require('fs');
const path = require('path');
const ui = require('../helpers/ui');

class CloneFolder {
	constructor(options) {
		this.command = options.command;
		this.inputStream = options.inputStream;
    this.outputStream = options.outputStream;
    this.errorStream = options.errorStream;
    this.packageObj = options.packageObj;
    this.message = options.message;
	}

	run(files) {
		const sourcePath = files.sourcePath;
		const targetPath = files.targetPath;
		const fileList = files.fileList;
		let cloneFiles = [];
		let makeFolders = [];
		let makeFoldersTemp = [];
		
		if (!!fs.existsSync(targetPath) && (this.command !== 'init')){
			ui.console(ui.red('Project Exist!'));
			return Promise.resolve(false);
		}
		ui.console(ui.cyan(this.message));
		this.makeDirectory(targetPath);
		
		fileList.forEach((value) => {
			const _targetFile = path.resolve(targetPath, value['file']);
			const _sourceFile = path.resolve(sourcePath, value['file']);

			if (!!value['directory']) {
				const _dir = path.resolve(targetPath, value['directory']);
				
				if (makeFoldersTemp.indexOf(_dir) < 0) {
					makeFoldersTemp.push(_dir);
					makeFolders.push(this.makeDirectory(_dir))
				}
			}
			if(value['file'].indexOf('.DS_Store') < 0){
				cloneFiles.push(this.writeFile(_sourceFile, _targetFile, value['file']))	
			}
		})


		return Promise.all(makeFolders).then(() => {
			return Promise.all(cloneFiles).then(() => {
				this.overWriteFile(targetPath , 'package.json')
			})
		})
	}

	makeDirectory(path) {
		if (!!!fs.existsSync(path)){
			return fs.mkdirSync(path)	
		}
	}

	writeFile(source, target, fileName) {
		ui.console(ui.green('    create ') + fileName);

		return fs.writeFileSync(target, fs.readFileSync(source));
	}
	overWriteFile(targetPath , targetFile) {
		let packageJson = path.join(targetPath , targetFile);
		this.packageObj;
		return new Promise(() => {
			return fs.readFile(packageJson, 'utf8', (err, data) => {
				let newJson;
				let originJson = JSON.parse(data);
				for (var key in this.packageObj) {
					if(key !== 'init') {
						originJson[key] = this.packageObj[key]	
					}
				}
				newJson = JSON.stringify(originJson , null, 2); 
        fs.writeFile(packageJson, newJson); 
			});
		});
	}
}
module.exports = CloneFolder;
