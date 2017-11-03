#!/usr/bin/env node

const manifest  = require('../package.json');
const program   = require('commander');
const builder   = require('../lib/builder');
const ora       = require('ora');

program
  .version(manifest.version);

program
  .command('new <project-name>')
  .alias('n')
  .description('Create project & package type project')
  .option('-p, --package', 'Created package project')
  .action((target, options) => {
      global.spinner = ora('initialize');
      global.spinner.start();
      
      builder(target, options);    
    })

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
