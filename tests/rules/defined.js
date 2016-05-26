'use strict';

const expect = require('chai').expect;
const defined = require('../../lib/rules/defined');

describe('rules:defined', function () {
  it('should return false when the value is not undefined', function () {
    const value = undefined;
    expect(defined(value)).to.be.false;
  });
  it('should return true when the value is an empty string', function () {
    const value = '';
    expect(defined(value)).to.be.true;
  });
  it('should return true when the value is an white-space-only string', function () {
    const value = '   ';
    expect(defined(value)).to.be.true;
  });
  it('should return true when the value is an empty array', function () {
    const value = [];
    expect(defined(value)).to.be.true;
  });
  it('should return true when the value is a NaN', function () {
    const value = NaN;
    expect(defined(value)).to.be.true;
  });
  it('should return true when the value is null', function () {
    const value = null;
    expect(defined(value)).to.be.true;
  });
  it('should return true when the value is truthy', function () {
    const value = 12;
    expect(defined(value)).to.be.true;
  });
});
