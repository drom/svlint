'use strict';

const Parser = require('tree-sitter');
const verilog = require('tree-sitter-verilog');

const traverse = require('./traverse.js');

const rules = require('./rules');

module.exports = () => {
  const parser = new Parser();
  parser.setLanguage(verilog);
  return source => {
    const tree = parser.parse(source);
    Object.keys(rules).map(ruleName => {
      traverse(rules[ruleName].checker)(tree.rootNode);
    });
  };
};
