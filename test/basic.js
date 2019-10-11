'use strict';

const lib = require('../lib/index.js');
const expect = require('chai').expect;

const linter = lib();

describe('basic', () => {
  it('requirable', () => {
    expect(linter).to.be.a('function');
  });
});

/* eslint-env mocha */
