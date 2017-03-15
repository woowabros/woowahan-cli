#!/usr/bin/env node
'use strict';

var program = require('commander');
var path = require('path');
var chalk = require('chalk');
var createManifest = require('../lib/manifest');
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
  .then(createManifest)
  .then(CLI.prepareWork)
  .then(CLI.readTemplateFiles)
  .then(CLI.writeTemplateFiles)
  .then(CLI.npmInstall)
  .catch(function(err) {
    console.error(chalk.yellow(err));
  });
