'use strict';

const expect = require('chai').expect;
const minlen = require('../../lib/rules/minlen');

describe('rules:minlen', function () {
  it('should return true if a string respects the minlen', function () {
    const str = '123';
    expect(minlen(str, 3)).to.be.true;
    expect(minlen(str, 2)).to.be.true;
  });
  it('should return false if a string doesnt respect the minlen', function () {
    const str = '1234';
    expect(minlen(str, 5)).to.be.false;
    expect(minlen(str, 6)).to.be.false;
  });
  it('should return true if an array respects the minlen', function () {
    const arr = [1, 2, 3];
    expect(minlen(arr, 3)).to.be.true;
    expect(minlen(arr, 0)).to.be.true;
  });
  it('should return false if an array doesnt respect the minlen', function () {
    const arr = [1, 2];
    expect(minlen(arr, 3)).to.be.false;
    expect(minlen(arr, 5)).to.be.false;
  });
  it ('should return true if the value is undefined or null', function() {
    expect(minlen(undefined, 0)).to.be.true;
    expect(minlen(null, 0)).to.be.true;
  });
});
