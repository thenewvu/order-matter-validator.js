'use strict';

const expect = require('chai').expect;
const min = require('../../lib/rules/min');

describe('rules:min', function () {
  describe('should return true if', function () {
    it('the val respects the min', function (cb) {
      min(1, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is undefined', function (cb) {
      min(undefined, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is null', function (cb) {
      min(null, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is a NaN', function (cb) {
      min(NaN, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is an empty string', function (cb) {
      min('', 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is a string', function (cb) {
      min('12', 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is an empty array', function (cb) {
      min([], 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is an array', function (cb) {
      min([1, 2], 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });

  describe('should return false if', function (cb) {
    it('the val doesnt respect the min', function (cb) {
      min(0, 2, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });
});
