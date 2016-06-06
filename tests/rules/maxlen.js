'use strict';

const expect = require('chai').expect;
const maxlen = require('../../lib/rules/maxlen');

describe('rules:maxlen', function () {
  describe('should return true if', function () {
    it('an array respects the maxlen', function (cb) {
      maxlen([1], 2, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('a string respects the maxlen', function (cb) {
      maxlen('1', 2, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is undefined', function (cb) {
      maxlen(undefined, 1, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is null', function (cb) {
      maxlen(null, 1, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });

  describe('should return false if', function (cb) {
    it('an array doesnt respect the maxlen', function (cb) {
      maxlen([2, 3], 1, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('a string doesnt respect the maxlen', function (cb) {
      maxlen('23', 1, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });

  describe('should throw if', function () {
    it('the len is less than 1', function () {
      expect(() => maxlen('string', 0))
        .to.throw('0 is not greater than 1');
    });
  });
});
