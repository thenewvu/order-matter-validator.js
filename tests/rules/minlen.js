'use strict';

const expect = require('chai').expect;
const minlen = require('../../lib/rules/minlen');

describe('rules:minlen', function () {
  describe('should return true if', function () {
    it('an array respects the minlen', function (cb) {
      minlen([1], 1, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('a string respects the minlen', function (cb) {
      minlen('1', 1, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is undefined', function (cb) {
      minlen(undefined, 1, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is null', function (cb) {
      minlen(null, 1, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });

  describe('should return false if', function (cb) {
    it('an array doesnt respect the minlen', function (cb) {
      minlen([2], 2, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('a string doesnt respect the minlen', function (cb) {
      minlen('2', 2, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });

  describe('should throw if', function () {
    it('the len is less than 1', function () {
      expect(() => minlen('string', 0))
        .to.throw('0 is not greater than 1');
    });
  });
});
