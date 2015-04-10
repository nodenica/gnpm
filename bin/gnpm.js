#!/usr/bin/env node

var Cli = require('../lib/cli');
var cli = new Cli();

var command = (process.argv[2]) ? process.argv[2] : null;
var commands = [
  'new',
  'login',
  'add',
  'install'
];
var argvs = (process.argv[3]) ? process.argv.slice(3)[0] : null;

/**
 * Error
 * command is null
 */
if (!command) {
  //cli.error(0);
  process.exit(0);
}

/**
 * Error
 * command don't exist in applications
 */
if ((commands.indexOf(command) != -1) === false) {
  //cli.error(1);
  process.exit(1);
}

cli[command](argvs);
