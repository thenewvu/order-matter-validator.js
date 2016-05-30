'use strict';

const expect = require('chai').expect;
const maxlen = require('../../lib/rules/maxlen');

describe('rules:maxlen', function () {
  it('should return true if a string respects the maxlen', function () {
    const str = '123';
    expect(maxlen(str, 3)).to.be.true;
    expect(maxlen(str, 5)).to.be.true;
  });
  it('should return false if a string doesnt respect the maxlen', function () {
    const str = '1234';
    expect(maxlen(str, 3)).to.be.false;
    expect(maxlen(str, 1)).to.be.false;
  });
  it('should return true if an array respects the maxlen', function () {
    const arr = [1, 2, 3];
    expect(maxlen(arr, 3)).to.be.true;
    expect(maxlen(arr, 5)).to.be.true;
  });
  it('should return false if an array doesnt respect the maxlen', function () {
    const arr = [1, 2];
    expect(maxlen(arr, 1)).to.be.false;
    expect(maxlen(arr, 0)).to.be.false;
  });
  it ('should return true if the value is undefined or null', function() {
    expect(maxlen(undefined, 0)).to.be.true;
    expect(maxlen(null, 0)).to.be.true;
  });
});
