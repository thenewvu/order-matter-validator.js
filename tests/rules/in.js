'use strict';

const expect = require('chai').expect;
const _in = require('../../lib/rules/in');

describe('rules:in', function () {
  describe('should return true if', function () {
    it('the val is in the array', function (cb) {
      _in(1, [1], valid => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is undefined', function (cb) {
      _in(undefined, [1], valid => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });
  describe('should return false if', function () {
    it('the val is not in the array', function (cb) {
      _in(1, [2, 3], valid => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('`===` operator returns false', function (cb) {
      _in('1', [1], valid => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });
  describe('should throw if', function () {
    it('the arr is not an array', function () {
      expect(() => _in(1, 'not an array'))
        .to.throw('"not an array" is not an array');
    });
  });
});
