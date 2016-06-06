'use strict';

const expect = require('chai').expect;
const pattern = require('../../lib/rules/pattern');

describe('rules:pattern', function () {
  describe('should return true if', function () {
    it('the val respects a literal regexp', function (cb) {
      const value = '12345a';
      const patt = /^\d+a$/;
      pattern(value, patt, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val respects a RegExp instance', function (cb) {
      const value = '12345a';
      const patt = new RegExp('^\\d+a$');
      pattern(value, patt, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('the val isnt a string', function (cb) {
      const value = 12345;
      const patt = new RegExp('^\\w+$');
      pattern(value, patt, (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });

  describe('should return false if', function () {
    it('the val doesnt respect a literal regexp', function (cb) {
      const value = '12345a';
      const patt = /^\d+$/;
      pattern(value, patt, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
    it('the val doesnt respect a RegExp instance', function (cb) {
      const value = '12345a';
      const patt = new RegExp('^\\d+$');
      pattern(value, patt, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });

  describe('should work if', function () {
    it('the pattern is a string', function (cb) {
      const value = '12345a';
      const patt = '^\\d+$';
      pattern(value, patt, (valid) => {
        expect(valid).to.be.false;
        cb();
      });
    });
  });

  describe('should throw if', function () {
    it('the pattern can not be converted to a regexp', function () {
      const value = '12345a';
      const patt = 123;
      expect(() => pattern(value, patt))
        .to.throw(TypeError);
    });
  });
});
