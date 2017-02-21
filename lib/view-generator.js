var path = require('path');
var ora = require('ora');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var chalk = require('chalk');
var cliPath = path.resolve(__dirname, '..');

function beforeGenerating(viewConfig) {
  viewConfig.viewFileList = [];
	return Promise.resolve(viewConfig);
}

function startGenerating(viewConfig) {
  return new Promise(function(resolve, reject) {
    var spinner = makeSpinner();
    viewConfig.spinner = spinner;
    try {
      spinner.start();

      if(fs.existsSync(viewConfig.viewPath)) {
        console.log();
        console.log(chalk.red(viewConfig.viewName) + ' already existed!');
        console.log();
        return reject();
      } else {
        makeView(viewConfig).then(function(viewConfig) {
          return resolve(viewConfig);
        })
      }
    } catch(e) {
      return reject(e);  
    }
      
  })
}

function endGenerating(viewConfig) {
  viewConfig.spinner.stop();
  
  console.log();
  console.log(chalk.green(' modified ' ) + 'views/index.js');
  viewConfig.viewFileList.forEach(function(file) {
    console.log(chalk.green('  created ' ) + file);
  });
  console.log();
}

function makeSpinner() {
  return ora({
    text: '',
    spinner: {
      interval: 100,
      frames: [
        '⠄ Generating view .',
        '⠆ Generating view ..',
        '⠇ Generating view ...',
        '⠋ Generating view ....',
        '⠙ Generating view .....',
        '⠸ Generating view ......',
        '⠰ Generating view .......',
        '⠠ Generating view ......',
        '⠰ Generating view .....',
        '⠸ Generating view ....',
        '⠙ Generating view ...',
        '⠋ Generating view ..',
        '⠇ Generating view .',
        '⠆ Generating view '
      ]
    }
  });
}

function makeView(viewConfig) {
	try {
    fs.mkdirSync(viewConfig.viewPath);
    writeJS(viewConfig);
    writeHTML(viewConfig);
    exportView(viewConfig);
    return Promise.resolve(viewConfig)  
  } catch (e) {
    return Promise.reject(e);
  }
}

function exportView(viewConfig) {
  var exportFilePath = path.resolve(viewConfig.appRootPath , 'views/index.js');
  
  try {
    var exportTemplate = `
export * from \'./${viewConfig.viewName}\';`

    fs.appendFileSync(exportFilePath, exportTemplate)
  } catch(e) {
    throw new Error(e);
  };
}

function writeJS(viewConfig) {
	var jsPath = path.resolve(viewConfig.viewPath , 'index.js');
  var jsTemplate = 
  `import Woowahan from \'woowahan\';
import template from \'./index.hbs\';

export const ${viewConfig.viewName}View = Woowahan.View.create(\'${viewConfig.viewName}View\', {
  template
});
`
	try {
    fs.writeFileSync(jsPath , jsTemplate);
    viewConfig.viewFileList.push('views/' + viewConfig.viewName + '/index.js');
  } catch (e){
    throw new Error(e);
  };
}

function writeHTML(viewConfig) {
  var htmlPath = path.resolve(viewConfig.viewPath , 'index.hbs');
  var htmlTemplate = 
  `<div>
  ${viewConfig.viewName}
<div>
`
  try {
    fs.writeFileSync(htmlPath , htmlTemplate);
    viewConfig.viewFileList.push('views/' + viewConfig.viewName + '/index.hbs');
  } catch (e){
    throw new Error(e);
  }
  
}

module.exports = {
	beforeGenerating: beforeGenerating,
	startGenerating: startGenerating,
  endGenerating: endGenerating
}

