'use strict';

const expect = require('chai').expect;
const minlen = require('../../lib/rules/minlen');

describe('rules:minlen', function () {
  it('should work with strings', function () {
    const value = '123';
    expect(minlen(value, 0)).to.be.true;
    expect(minlen(value, 3)).to.be.true;
    expect(minlen(value, 4)).to.be.false;
  });
  it('should work with an empty string', function () {
    const value = '';
    expect(minlen(value, 0)).to.be.true;
    expect(minlen(value, 1)).to.be.false;
  });
  it('should work with arrays', function () {
    const value = [1, 2, 3];
    expect(minlen(value, 0)).to.be.true;
    expect(minlen(value, 3)).to.be.true;
    expect(minlen(value, 4)).to.be.false;
  });
  it('should work with an empty array', function () {
    const value = [];
    expect(minlen(value, 0)).to.be.true;
    expect(minlen(value, 1)).to.be.false;
  });
});
