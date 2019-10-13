'use strict';

const traverse = require('./traverse.js');
const rules = require('./rules');

module.exports = (node, messenger) => {
  Object.keys(rules).map(ruleName => {
    traverse(rules[ruleName].checker(messenger))(node);
  });
};
