'use strict';

const expect = require('chai').expect;
const len = require('../../lib/rules/len');

describe('rules:len', function () {
  it('should return true if a string respects the length', function () {
    const str = '123';
    expect(len(str, 3)).to.be.true;
  });
  it('should return false if a string doesnt respect the length', function () {
    const str = '';
    expect(len(str, 3)).to.be.false;
  });
  it('should return true if an array respects the length', function () {
    const arr = [1, 2, 3];
    expect(len(arr, 3)).to.be.true;
  });
  it('should return false if an array doesnt respect the length', function () {
    const arr = [];
    expect(len(arr, 3)).to.be.false;
  });
  it ('should return true if the value is undefined or null', function() {
    expect(len(undefined, 0)).to.be.true;
    expect(len(null, 0)).to.be.true;
  });
});
