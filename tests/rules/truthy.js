'use strict';

const expect = require('chai').expect;
const truthy = require('../../lib/rules/truthy');

describe('rules:truthy', function () {
  describe('should return false if', function () {
    it('the value is undefined', function (cb) {
      truthy(undefined, undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('the value is null', function (cb) {
      truthy(null, undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('the value is an empty string', function (cb) {
      truthy('', undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('the value is a NaN', function (cb) {
      truthy(NaN, undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('the value is a zero', function (cb) {
      truthy(0, undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('the value is false', function (cb) {
      truthy(false, undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });
  describe('should return true if', function () {
    it('the val is truthy', function (cb) {
      truthy(12, undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });
});
