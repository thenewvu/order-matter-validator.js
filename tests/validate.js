'use strict';

const expect = require('chai').expect;
const validate = require('../lib');

describe('validate', function () {
  describe('should return null if', function () {
    it('the obj matches the schema', function (cb) {
      const object = { field: 'value' };
      const schema = [['field', 'defined', 'field must be defined']];
      validate(object, schema, (err) => {
        expect(err).to.not.exist;
        cb();
      });
    });
  });
  describe('should return err if', function () {
    it('the obj doesnt match the schema', function (cb) {
      const object = {};
      const schema = [['field', 'defined', 'field must be defined']];
      validate(object, schema, (err) => {
        expect(err).to.exist;
        expect(err.rule.name).to.equal('defined');
        expect(err.path).to.equal('field');
        cb();
      });
    });
  });
  it('should work correctly with null', function (cb) {
    const schema = [['field', 'defined', 'field must be defined']];
    validate(null, schema, (err) => {
      expect(err).to.exist;
      expect(err.rule.name).to.equal('defined');
      expect(err.path).to.equal('field');
      cb();
    });
  });
  it('should work correctly with field path', function (cb) {
    const object = { path: { to: { field: 'value' } } };
    const schema = [['path.to.field', 'defined', 'field must be defined']];
    validate(object, schema, (err) => {
      expect(err).to.not.exist;
      cb();
    });
  });
});
