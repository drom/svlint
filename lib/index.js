'use strict';

const Parser = require('tree-sitter');
const verilog = require('tree-sitter-verilog');

const linter = require('./linter.js');

module.exports = () => {
  const parser = new Parser();
  parser.setLanguage(verilog);
  return source => {
    const tree = parser.parse(source);
    linter(tree.rootNode, (node, severity, msg) => {
      console.error(
        node.startPosition.row.toString().padStart(4) +
        ':' +
        node.endPosition.column.toString().padEnd(4) +
        severity.padEnd(8),
        msg
      );
    });
  };
};
