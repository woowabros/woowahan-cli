var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var templates = require('./templates');
var generateConfig = require('./config');

module.exports = function(config) {
  if (fs.existsSync(config.path)) {
    throw new Error(chalk.red(`'${config.name}' ${config.generate} existed!`));
  }

  createView(config);
  exportCreatedView(config);
};

function createView(config) {
  var viewPath = config.path;
  var rowItemViewPath = path.resolve(config.path, generateConfig.rowItmePath);
  var directorySets = {
    default: [ viewPath ],
    collection: [ viewPath, rowItemViewPath ]
  };
  var fileSets = {
    default: [ generateConfig.indexJs, generateConfig.indexHtml ],
    collection: [ generateConfig.indexJs, generateConfig.indexHtml, generateConfig.rowItemJs, generateConfig.rowItemHtml ]
  };

  createDirectories(directorySets[config.type]);
  config.createdFileList = createFiles(config.path, fileSets[config.type], config);
}

function exportCreatedView(config) {
  var exportjSPath = path.resolve('.', generateConfig.viewPath, generateConfig.indexJs);

  try {
    config.type = generateConfig.fileExport;
    fs.appendFileSync(exportjSPath, templates(generateConfig.indexJs, config));
    config.modifiedFileList.push(path.join(generateConfig.viewPath, generateConfig.indexJs));
  } catch (error) {
    config.spinner.stop();
    throw error;
  }
}

function createDirectories(directoryList) {
  directoryList.forEach(function(dir) {
    try {
      fs.mkdirSync(dir);
    } catch (error) {
      throw error;
    }
  });
}

function createFiles(targetPath, fileList, config) {
  var createdFileList = [];

  fileList.forEach(function(file) {
    try {
      var fileTemplate;
      var filePath = path.resolve(targetPath, file);
      var createdFile;
      
      fileTemplate = templates(file, config);
      createdFile = path.join(generateConfig.viewPath, config.name, file);
      fs.writeFileSync(filePath, fileTemplate);
      createdFileList.push(createdFile);
    } catch (error) {
      throw error;
    }
  });
  return createdFileList;
}
