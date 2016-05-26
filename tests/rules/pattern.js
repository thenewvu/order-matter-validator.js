'use strict';

const expect = require('chai').expect;
const pattern = require('../../lib/rules/pattern');

describe('rules:pattern', function() {
  it('should work with literal regexp', function() {
    const value = '12345a';
    expect(pattern(value, /^\d+$/)).to.be.false;
    expect(pattern(value, /^\d+a$/)).to.be.true;
  });
  it('should work with RegExp instances', function() {
    const value = '12345a';
    expect(pattern(value, new RegExp('^\\d+a$'))).to.be.true;
    expect(pattern(value, new RegExp('^\\d+$'))).to.be.false;
  });
});
