'use strict';

const fs = require('fs');
const path = require('path');

let fileList = [];

module.exports = function(targetPath) {
	return getFileList(targetPath).then((result) => {
		return result;
	})
}

function getFileList(targetPath, subPath) {
	return new Promise((resolve, reject) => {
		if(fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
			let files = fs.readdirSync(targetPath);
			
			files.forEach((file) => {
				let fileObj = {};
				let _targetPath = path.resolve(targetPath, file);

				if (fs.existsSync(_targetPath)){
					if (fs.lstatSync(_targetPath).isDirectory()) {
						if (!!subPath){
							file = subPath +file + "/";
						} else {
							file = file + "/";
						}
						return getFileList(_targetPath, file);
				
					} else {
						let _file;
						if (!!subPath) {
							fileObj['directory'] = subPath;
							_file = (subPath + file);
						} else {
							_file = file;
						}
						fileObj['file'] = _file;
						fileList.push(fileObj);
						resolve(fileList)
					}
				}
			})
		}	
	})

	
	
}
