'use strict';

const expect = require('chai').expect;
const nin = require('../../lib/rules/nin');

describe('rules:nin', function () {
  describe('should return true if', function () {
    it('the val is not in the array', function (cb) {
      nin(0, [1], valid => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is undefined', function (cb) {
      nin(undefined, [1], valid => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });
  describe('should return false if', function () {
    it('the val is in the array', function (cb) {
      nin(1, [1, 3], valid => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });
  describe('should throw if', function () {
    it('the arr is not an array', function () {
      expect(() => nin(1, 'not an array'))
        .to.throw('"not an array" is not an array');
    });
  });
});
