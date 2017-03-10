var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var templates = require('./templates');
var config = require('../config');
var validate = require('../validate');

module.exports = function(viewConfig) {
  if (validate.isExist(viewConfig.path)) {
    throw new Error(chalk.red(`'${viewConfig.name}' exist!`));
  }

  createView(viewConfig);
  exportCreatedView(viewConfig);
};

function createView(viewConfig) {
  var viewPath = viewConfig.path;
  var rowItemViewPath = path.resolve(viewConfig.path, config.ROWITEM_PATH);
  var directorySets = {
    default: [ viewPath ],
    collection: [ viewPath, rowItemViewPath ]
  };
  var fileSets = {
    default: [ config.INDEX_JS, config.INDEX_HTML ],
    collection: [ config.INDEX_JS, config.INDEX_HTML, config.ROWITEM_JS, config.ROWITEM_HTML ]
  };

  createDirectories(directorySets[viewConfig.type]);
  viewConfig.createdFileList = createFiles(viewConfig.path, fileSets[viewConfig.type], viewConfig);
}

function exportCreatedView(viewConfig) {
  var exportjSPath = path.resolve('.', config.VIEW_PATH, config.INDEX_JS);

  try {
    viewConfig.type = config.FILE_EXPORT;
    fs.appendFileSync(exportjSPath, templates(config.INDEX_JS, viewConfig));
    viewConfig.modifiedFileList.push(path.join(config.VIEW_PATH, config.INDEX_JS));
  } catch (error) {
    viewConfig.spinner.stop();
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

function createFiles(targetPath, fileList, viewConfig) {
  var createdFileList = [];

  fileList.forEach(function(file) {
    try {
      var fileTemplate;
      var filePath = path.resolve(targetPath, file);
      var createdFile;
      
      fileTemplate = templates(file, viewConfig);
      createdFile = path.join(config.VIEW_PATH, viewConfig.name, file);
      fs.writeFileSync(filePath, fileTemplate);
      createdFileList.push(createdFile);
    } catch (error) {
      throw error;
    }
  });
  return createdFileList;
}
