'use strict';

const path = require('path');
const readline = require('readline');
const getFileList = require('../helpers/get-file-list');
const ui = require('../helpers/ui');
const installPackage = require('../tasks/install-package');
const CloneFolder = require('../tasks/clone-folder');
const getPackageJson = require('../tasks/get-packagejson');

module.exports = function(args){
	const _this = this;
	const message = this.message ? this.message : 'initializing Woowahan App';
	const sourcePath = path.join(this.root, "/templates/app");
	const targetPath = this.currentPath;
	let fileInfo = {
		sourcePath,
		targetPath
	}
	
	getPackageJson().then((result) => {
		getFileList(sourcePath).then((list) => {
			fileInfo['fileList'] = list;
			const cloneFolder = new CloneFolder({
				command: _this.command,
				inputStream: _this.inputStream,
				outputStream: _this.outputStream,
				errorStream: _this.errorStream,
				packageObj: result,
				message: message
			})

			cloneFolder.run(fileInfo).then((result) => {
				if(typeof result === 'boolean' && result === false) {

				}else {
					installPackage(targetPath);
				}
			});

		})
	})

	
}
