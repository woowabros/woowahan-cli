var fs = require('fs-extra');
var path = require('path');

module.exports = {
	isProjectRoot: isProjectRoot,
  isExist: isExist,
  hasUpperCase: hasUpperCase
};

function isProjectRoot() {
  var hasPackageJson = fs.existsSync(path.resolve('.', 'package.json'));
  var isRoot = fs.existsSync(path.resolve('.', 'main.js'));
  
  return hasPackageJson && isRoot;
}

function isExist(targetPath) {
	return fs.existsSync(targetPath);
}

function hasUpperCase(name) {
  return (/[A-Z]/.test(name));
}
