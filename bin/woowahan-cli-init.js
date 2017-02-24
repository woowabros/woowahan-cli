#!/usr/bin/env node
'use strict';

var program = require('commander');
var path = require('path');
var chalk = require('chalk');
var manifestManager = require('../lib/manifest-manager');
var currentDirectories = process.cwd().split('/');
var CLI = require('../lib/cli-task');
var CLIConfig = {};

program
  .usage('project-name')
	.parse(process.argv);

CLIConfig.projectName = currentDirectories[currentDirectories.length - 1];
CLIConfig.projectPath = path.resolve('.');

Promise
  .resolve(CLIConfig)
  .then(manifestManager)
  .then(CLI.prepareWork)
  .then(CLI.readTemplateFiles)
  .then(CLI.writeTemplateFiles)
  .then(CLI.npmInstall)
  .then(CLI.finishWork)
  .catch(function(err) {
    console.error(chalk.yellow(err));
  });
