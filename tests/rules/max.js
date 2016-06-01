'use strict';

const expect = require('chai').expect;
const max = require('../../lib/rules/max');

describe('rules:max', function () {
  describe('should return true if', function () {
    it('the val respects the max', function (cb) {
      max(1, 2, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is undefined', function (cb) {
      max(undefined, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is null', function (cb) {
      max(null, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is a NaN', function (cb) {
      max(NaN, 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is an empty string', function (cb) {
      max('', 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is a string', function (cb) {
      max('12', 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is an empty array', function (cb) {
      max([], 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val is an array', function (cb) {
      max([1, 2], 0, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });

  describe('should return false if', function (cb) {
    it('the val doesnt respect the max', function (cb) {
      max(2, 0, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });
});
