'use strict';

const expect = require('chai').expect;
const maxlen = require('../../lib/rules/maxlen');

describe('rules:maxlen', function () {
  it('should work with strings', function () {
    const value = '123';
    expect(maxlen(value, 3)).to.be.true;
    expect(maxlen(value, 2)).to.be.false;
  });
  it('should work with an empty string', function () {
    const value = '';
    expect(maxlen(value, 0)).to.be.true;
    expect(maxlen(value, 2)).to.be.true;
  });
  it('should work with arrays', function () {
    const value = [1, 2, 3];
    expect(maxlen(value, 3)).to.be.true;
    expect(maxlen(value, 2)).to.be.false;
  });
  it('should work with an empty array', function () {
    const value = [];
    expect(maxlen(value, 0)).to.be.true;
    expect(maxlen(value, 2)).to.be.true;
  });
});
