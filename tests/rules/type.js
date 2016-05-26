'use strict';

const expect = require('chai').expect;
const type = require('../../lib/rules/type');

describe('rules:type', function () {
  it('should work with strings', function () {
    const value = '123';
    expect(type(value, 'string')).to.be.true;
  });
  it('should work with numbers', function () {
    const value = 123;
    expect(type(value, 'number')).to.be.true;
  });
  it('should work with symbols', function () {
    const value = Symbol();
    expect(type(value, 'symbol')).to.be.true;
  });
  it('should work with arrow functions', function () {
    const value = () => {};
    expect(type(value, 'function')).to.be.true;
  });
  it('should work with ES6 class methods', function () {
    class Class { method() {} }
    const instance = new Class();
    expect(type(instance.method, 'function')).to.be.true;
  });
  it('should not work with ES6 class getter', function () {
    class Class { get getter() {} }
    const instance = new Class();
    expect(type(instance.getter, 'function')).to.be.false;
  });
  it('should not work with ES6 class setter', function () {
    class Class { set setter(val) {} }
    const instance = new Class();
    expect(type(instance.setter, 'function')).to.be.false;
  });
  it('should work with literal objects', function () {
    const value = {dummy: 1};
    expect(type(value, 'object')).to.be.true;
  });
  it('should work with an empty object', function () {
    const value = {};
    expect(type(value, 'object')).to.be.true;
  });
  it('should work with Object instances', function () {
    const value = new Object();
    expect(type(value, 'object')).to.be.true;
  });
});
