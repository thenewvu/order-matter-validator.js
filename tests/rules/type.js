'use strict';

const expect = require('chai').expect;
const type = require('../../lib/rules/type');

describe('rules:type', function () {
  describe('should work with', function () {
    it('string', function (cb) {
      type('12312', 'string', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('number', function (cb) {
      type(12312, 'number', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('symbol', function (cb) {
      type(Symbol(), 'symbol', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('arrow function', function (cb) {
      type(() => {}, 'function', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('ES6 class method', function (cb) {
      class Class { method() {} }
      const instance = new Class();
      type(instance.method, 'function', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('empty literal object', function (cb) {
      type({}, 'object', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('literal object', function (cb) {
      type({ field: 'value' }, 'object', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
    it('Object instance', function (cb) {
      type(new Object(), 'object', (valid) => {
        expect(valid).to.be.true;
        cb();
      });
    });
  });

  describe('should throw if', function () {
    it('the type is not supported', function () {
      expect(() => type(12, 'foo'))
        .to.throw('"foo" is not a supported type');
    });
  });
});
