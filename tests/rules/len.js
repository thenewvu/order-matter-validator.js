'use strict';

const expect = require('chai').expect;
const len = require('../../lib/rules/len');

describe('rules:len', function () {
  it('should work with strings', function () {
    const value = '123';
    expect(len(value, 1)).to.be.false;
    expect(len(value, 3)).to.be.true;
  });
  it('should work with an empty string', function () {
    const value = '';
    expect(len(value, 0)).to.be.true;
    expect(len(value, 3)).to.be.false;
  });
  it('should work with arrays', function () {
    const value = [1, 2, 3];
    expect(len(value, 0)).to.be.false;
    expect(len(value, 3)).to.be.true;
  });
  it('should work with an empty array', function () {
    const value = [];
    expect(len(value, 0)).to.be.true;
    expect(len(value, 3)).to.be.false;
  });
});
