'use strict';

const expect = require('chai').expect;
const validate = require('../lib');

describe('validate', function () {
  it('should not throw if the object matches the schema', function () {
    const object = { field: 'value' };
    const schema = [['field', 'defined', 'field must be defined']];
    expect(() => validate(object, schema)).to.not.throw();
  });
  it('should throw if the object doesnt match the schema', function () {
    const object = {};
    const schema = [['field', 'defined', 'field must be defined']];
    expect(() => validate(object, schema)).to.throw('field must be defined');
  });
  it('should work correctly with null', function () {
    const schema = [['field', 'defined', 'field must be defined']];
    expect(() => validate(null, schema)).to.throw('field must be defined');
  });
  it('should work correctly with field path', function () {
    const object = { path: { to: { field: 'value' } } };
    const schema = [['path.to.field', 'defined', 'field must be defined']];
    expect(() => validate(object, schema)).to.not.throw();
  });
});
