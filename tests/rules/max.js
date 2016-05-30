'use strict';

const expect = require('chai').expect;
const max = require('../../lib/rules/max');

describe('rules:max', function () {
  it('should return true if the value respects the maximum value', function () {
    expect(max(1, 2)).to.be.true;
    expect(max(-1, 0)).to.be.true;
  });
  it('should return false if the value doesnt respect the maximum value', function () {
    expect(max(2, 0)).to.be.false;
    expect(max(100, 1)).to.be.false;
  });
  it('should return true if the value isnt a number', function () {
    expect(max(undefined, 0)).to.be.true;
    expect(max(NaN, 0)).to.be.true;
    expect(max('', 0)).to.be.true;
    expect(max('12', 0)).to.be.true;
    expect(max([], 0)).to.be.true;
    expect(max([1, 2], 0)).to.be.true;
  });
});
