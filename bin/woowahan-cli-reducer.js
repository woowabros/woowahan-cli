#!/usr/bin/env node
'use strict';

var REDUCER_NAME = 0;
var ACTION_NAME = 1;
var program = require('commander');
var chalk = require('chalk');
var path = require('path');
var generator = require('../lib/generate');
var utils = require('../lib/utilities');
var reducerConfig = {};

program
  .usage('reducer-name <action-name>')
  .parse(process.argv);

utils.checkIsRootofProject();

if (!!!program.args[ACTION_NAME]) {
  console.log();
  console.log(`woowahan-cli reducer ${program.args[REDUCER_NAME]} ${chalk.red(' ActionName(Required)')}`);
  console.log();

  process.exit();
}

reducerConfig.name = program.args[REDUCER_NAME];
reducerConfig.actionName = program.args[ACTION_NAME];
reducerConfig.path = path.resolve('.', 'reducers');
reducerConfig.generate = 'reducers';

generator(reducerConfig);
