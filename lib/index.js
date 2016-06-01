'use strict';

const _ = require('lodash');
const async = require('async');
const rules = require('./rules');
const freeze = require('./utils/freeze');
const log = require('./utils/log')('omv:index');

/**
 * A subtask processes a rule schema of an object.
 * @param {Array} schema - The schema.
 * @param {Object} obj - The object.
 * @param {Function} cb - The callback.
 */
function eachRule(schema, obj, cb) {
  // process rule schema
  const rule = {
    desc: schema[3] || schema[2],
    opts: schema[3] ? schema[2] : undefined,
    name: schema[1]
  };
  const path = schema[0];
  // validate rule impl
  const impl = rules[rule.name];
  if (!impl) {
    throw new Error(`Not found '${rule}'`);
  }
  // validate the value
  const value = _.get(obj, path);
  impl(value, rule.opts, (valid) => {
    if (valid) {
      cb(null);
    } else {
      cb({ rule, path, value });
    }
  });
}

/**
 * Validate an `obj` using the `schema`.
 * @param {Object} obj - The object.
 * @param {[type]} schema - The schema.
 * @param {[type]} onerr - On error callback.
 */
function validate(obj, schema, cb) {
  // validate cb
  if (typeof cb != 'function') {
    throw new Error('cb must be a function');
  }
  // validate schema
  if (!Array.isArray(schema)) {
    throw new Error('schema must be an array of rules');
  }
  // protect the original object
  const _obj = freeze(_.clone(obj));
  // validate the object
  async.mapSeries(schema, (rule, next) => {
    eachRule(rule, _obj, next);
  }, cb);
}

/**
 * Register an external rule.
 * @param {String} name - The rule name.
 * @param {Function} impl - The rule impl.
 */
validate.use = function (name, impl) {
  // warn overwriting rule
  if (rules[name]) {
    log.warn(`Overwrote rule "${name}"`);
  }
  // validate impl
  if (impl.length != 3) {
    throw new Error('The rule impl must be (val, opts, cb)');
  }
  // register the rule
  rules[name] = impl;
  return validate;
};

module.exports = validate;
