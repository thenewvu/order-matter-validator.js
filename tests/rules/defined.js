'use strict';

const expect = require('chai').expect;
const defined = require('../../lib/rules/defined');

describe('rules:defined', function () {
  describe('should return false if', function() {
    it('the value is undefined', function(cb) {
      defined(undefined, undefined, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });
  describe('should return true if', function() {
    it('the value is an empty string', function(cb) {
      defined('', undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is a white-space-only string', function(cb) {
      defined('    ', undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is an empty array', function(cb) {
      defined([], undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is a NaN', function(cb) {
      defined(NaN, undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is null', function(cb) {
      defined(null, undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the value is truthy', function(cb) {
      defined(12, undefined, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });
});
