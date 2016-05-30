'use strict';

const expect = require('chai').expect;
const truthy = require('../../lib/rules/truthy');

describe('rules:truthy', function () {
  it('should return false when the value is not truthy', function () {
    const $undefined = undefined;
    expect(truthy($undefined)).to.be.false;
    const $emptyArray = [];
    expect(truthy($emptyArray)).to.be.false;
    const $emptyString = '';
    expect(truthy($emptyString)).to.be.false;
    const $NaN = NaN;
    expect(truthy($NaN)).to.be.false;
    const $zero = 0;
    expect(truthy($zero)).to.be.false;
    const $null = null;
    expect(truthy($null)).to.be.false;
    const $false = false;
    expect(truthy($false)).to.be.false;
  });
  it('should return true when the value is truthy', function () {
    const value = 123123;
    expect(truthy(value)).to.be.true;
  });
});
