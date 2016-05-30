'use strict';

const expect = require('chai').expect;
const pattern = require('../../lib/rules/pattern');

describe('rules:pattern', function() {
  it('should return true if the value respects the literal regexp', function() {
    const value = '12345a';
    expect(pattern(value, /^\d+a$/)).to.be.true;
  });
  it('should return false if the value doesnt respect the literal regexp', function() {
    const value = '12345a';
    expect(pattern(value, /^\d+$/)).to.be.false;
  });
  it('should return true if the value respects the RegExp instances', function() {
    const value = '12345a';
    expect(pattern(value, new RegExp('^\\d+a$'))).to.be.true;
  });
  it('should return false if the value doesnt respect the RegExp instances', function() {
    const value = '12345a';
    expect(pattern(value, new RegExp('^\\d+$'))).to.be.false;
  });
  it('should return true if the value isnt a string', function() {
    const value = 12345;
    expect(pattern(value, new RegExp('^\\w+$'))).to.be.true;
  });
});
