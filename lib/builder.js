const path            = require('path');
const chalk           = require('chalk');
const download        = require('download');
const { spawn, exec } = require('child_process');
const mv              = require('mv');
const rm              = require('rimraf');
const fsreplace       = require('replace-in-file');
const checkVersion    = require('./check-version');
const config          = require('./config');

module.exports = (target, options) => {
  const builder = (name, version) => {
    global.spinner.start();
    global.spinner.text = 'downloading template';

    download(config.templateRepo, path.resolve(config.downloadDir), { 
      extract: true, 
      strip: 1, 
      mode: '666', 
      headers: { accept: 'application/zip' } 
    }).then(data => {
      mv(path.resolve(config.downloadDir, config.projectTemplate), target, { mkdirp: true },  err => {
        rm(path.resolve(config.downloadDir), err => err);

        fsreplace.sync({
          files: path.resolve(target, 'package.json'),
          from: '@project-name',
          to: target
        });

        process.chdir(target);

        global.spinner.succeed(' template download completed');
        
        global.spinner.text = 'npm install';
        global.spinner.start();

        exec('npm install', (err, stdout, stderr) => {
          global.spinner.succeed(' create completed. enjoy~');
          global.spinner.stop();
          
          if (err) {
            rm(path.resolve(config.downloadDir, 'node_modules'), err => {
              console.log();
              console.log(chalk.green(`cd ${target} && npm install`));
              console.log();
            });
          }

          process.exit(0);
        })
      });
    }).catch(err => {
      global.spinner.fail(' Template download failed. Check your internet connection.');
      process.exit(1);
    })
  }
  
  checkVersion(builder);
};
