'use strict';

const expect = require('chai').expect;
const min = require('../../lib/rules/min');

describe('rules:min', function () {
  it('should return true if the value respects the minimum value', function () {
    expect(min(1, 0)).to.be.true;
    expect(min(-1, -100)).to.be.true;
  });
  it('should return false if the value doesnt respect the minimum value', function () {
    expect(min(-1, 0)).to.be.false;
    expect(min(0, 1)).to.be.false;
  });
  it('should return true if the value isnt a number', function () {
    expect(min(undefined, 0)).to.be.true;
    expect(min(NaN, 0)).to.be.true;
    expect(min('', 0)).to.be.true;
    expect(min('12', 0)).to.be.true;
    expect(min([], 0)).to.be.true;
    expect(min([1, 2], 0)).to.be.true;
  });
});
