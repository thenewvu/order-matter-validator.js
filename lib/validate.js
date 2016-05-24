'use strict';

const rules = require('./rules');
const freeze = require('./utils/freeze');

/**
 * Setup logging methods.
 */
const debug = require('debug');
const logi = debug('order-matter-validator:info');
logi.log = console.log.bind(console);
const logw = debug('order-matter-validator:warn');
logw.log = console.log.bind(console);

/**
 * A subtask works on each rule schema.
 * @param {Array} schema - The schema.
 * @param {Array} field - The field name.
 * @param {Object} value - The value of field.
 * @param {Function} onerr - On error callback.
 */
function eachRule(schema, field, value, onerr) {
  const rule = schema[0];
  const opts = schema[1];
  const desc = schema[2];
  const impl = rules[rule];
  if (typeof impl != 'function') {
    throw new Error(`Bad rule '${rule}'`);
  }
  const valid = impl(value, opts);
  if (!valid) {
    onerr({ rule, opts, field, value, desc });
  }
  return valid;
}

/**
 * Validate an `obj` using the `schema`.
 * @param {Object} obj - The object.
 * @param {[type]} schema - The schema.
 * @param {[type]} onerr - On error callback.
 */
function validate(obj, schema, onerr) {
  // ensure no dirty on the original object
  const _obj = freeze(Object.assign({}, obj));
  for (const subschema of schema) {
    const field = subschema[0];
    const rules = subschema[1];
    const value = _obj[field];
    for (const rule of rules) {
      if (eachRule(rule, field, value, onerr)) {
        return;
      }
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
