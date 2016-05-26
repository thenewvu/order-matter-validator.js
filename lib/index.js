'use strict';

const _ = require('lodash');
const rules = require('./rules');
const freeze = require('./utils/freeze');
const InvalidateError = require('./utils/InvalidateError');

/**
 * Setup logging methods.
 */
const debug = require('debug');
const logi = debug('order-matter-validator:info');
logi.log = console.log.bind(console);
const logv = debug('order-matter-validator:verbose');
logv.log = console.log.bind(console);
const logw = debug('order-matter-validator:warn');
logw.log = console.log.bind(console);

/**
 * The default onerr callback.
 * @param {Object} err - The error object.
 */
function defonerr(err) {
  throw err;
}

/**
 * A subtask works on each rule schema.
 * @param {Array} schema - The schema.
 * @param {Object} obj - The object.
 * @param {Function} onerr - On error callback.
 */
function eachRule(schema, obj, onerr) {
  logv('processing rule ', schema);
  const desc = schema[3] || schema[2];
  logv('rule desc ', desc);
  const opts = schema[3] ? schema[2] : undefined;
  logv('rule opts ', opts);
  const rule = schema[1];
  logv('rule name ', rule);
  const path = schema[0];
  logv('obj path ', path);
  const impl = rules[rule];
  if (typeof impl != 'function') {
    throw new Error(`Bad rule '${rule}'`);
  }
  const value = _.get(obj, path);
  logv('value ', value);
  const valid = impl(value, opts);
  logv('valid ', valid);
  valid || onerr(new InvalidateError({
    desc,
    opts,
    rule,
    path,
    value
  }));
  return valid;
}

/**
 * Validate an `obj` using the `schema`.
 * @param {Object} obj - The object.
 * @param {[type]} schema - The schema.
 * @param {[type]} onerr - On error callback.
 */
function validate(obj, schema, onerr) {
  logv('validating object ', obj);
  logv('using schema ', schema);
  // use default onerr if no one
  onerr || logv('using default onerr');
  onerr = onerr || defonerr;
  // validate onerr
  if (typeof onerr != 'function') {
    throw new Error('onerr must be a function');
  }
  // validate schema
  if (!Array.isArray(schema)) {
    throw new Error('schema must be an array of rules');
  }
  // ensure no dirty on the original object
  const _obj = freeze(_.clone(obj));
  // valuate rules one by one
  for (const rule of schema) {
    if (!eachRule(rule, _obj, onerr)) {
      return;
    }
  }
}

/**
 * Extend with a new rule.
 * @param {String} rule - The rule name.
 * @param {Function} impl - The rule impl.
 * @return {Function} - The chainable.
 */
validate.use = function (rule, impl) {
  if (rules[rule]) {
    logw(`You overwrote rule '${rule}'`);
  }
  rules[rule] = impl;
  return validate;
};

module.exports = validate;
