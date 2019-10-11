#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const concat = require('concat-stream');

const lib = require('../lib/index.js');

yargs
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .version()
  .help()
  .argv;

const linter = lib();

function gotInput (source) {
  linter(source);
}

const concatStream = concat(gotInput);

let source;

// if (process.stdin.isTTY) {
source = process.stdin.setEncoding('ascii');
// }

if (source) {
  source.pipe(concatStream);
} else {
  yargs.showHelp();
}
