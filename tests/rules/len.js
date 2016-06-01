'use strict';

const expect = require('chai').expect;
const len = require('../../lib/rules/len');

describe('rules:len', function () {
  describe('should return true if', function () {
    it('a string respects the length', function (cb) {
      len('123', 3, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('an array respects the length', function (cb) {
      len([1, 2, 3], 3, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is undefined', function (cb) {
      len(undefined, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is null', function (cb) {
      len(null, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });
  describe('should return false if', function () {
    it('a string doesnt respect the length', function (cb) {
      len('', 3, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('an array doesnt respect the length', function (cb) {
      len([], 3, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });

  });
});
