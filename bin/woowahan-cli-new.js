#!/usr/bin/env node
'use strict';

const PROJECT_NAME = 0;
var path = require('path');
var fs = require('fs');
var program = require('commander');
var chalk = require('chalk');
var manifestManager = require('../lib/manifest-manager');
var CLI = require('../lib/cli-task');
var CLIConfig = {};

program
	.usage('project-name')
	.parse(process.argv);

if (fs.existsSync(path.resolve(__dirname, CLIConfig.projectName))) {
  console.log();
  console.log(chalk.red(CLIConfig.projectName + ' is already existed.'));
  console.log();

  process.exit();
}

CLIConfig.projectName = program.args[PROJECT_NAME];
CLIConfig.projectPath = path.resolve('.', CLIConfig.projectName);

Promise.resolve(CLIConfig)
  .then(manifestManager)
  .then(CLI.prepareWork)
  .then(CLI.readTemplateFiles)
  .then(CLI.writeTemplateFiles)
  .then(CLI.npmInstall)
  .then(CLI.finishWork)
  .catch(function(err) {
    console.error(chalk.yellow(err));
  });
