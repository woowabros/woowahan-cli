#!/usr/bin/env node
'use strict';

var PROJECT_NAME = 0;
var path = require('path');
var program = require('commander');
var chalk = require('chalk');
var manifestManager = require('../lib/manifest-manager');
var validate = require('../lib/validate');
var ui = require('../lib/ui');
var CLI = require('../lib/cli-task');
var CLIConfig = {};

program
	.usage('project-name')
	.parse(process.argv);

CLIConfig.projectName = program.args[PROJECT_NAME];
CLIConfig.projectPath = path.resolve('.', CLIConfig.projectName);

if (validate.hasUpperCase(CLIConfig.projectName)) {
  var messages = [
    `Could not create a project called ${chalk.red(CLIConfig.projectName)} because of npm naming restrictions:`,
    chalk.red('* name can no longer contain capital letters')
  ];

  ui.error(messages);
  process.exit();
}

if (validate.isExist(CLIConfig.projectPath)) {
  ui.error(chalk.red(`'${CLIConfig.projectName}' exists!`));
  process.exit();
}

Promise.resolve(CLIConfig)
  .then(manifestManager)
  .then(CLI.prepareWork)
  .then(CLI.readTemplateFiles)
  .then(CLI.writeTemplateFiles)
  .then(CLI.npmInstall)
  .catch(function(err) {
    console.error(chalk.yellow(err));
  });
