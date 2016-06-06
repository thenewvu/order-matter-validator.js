'use strict';

const _ = require('lodash');

/**
 * List of supported types.
 * @type {Array}
 */
const SUPPORTED_TYPES = [
  'number', 'string', 'function',
  'symbol', 'undefined', 'object'
];

/**
 * Check if a value has a type,
 * @param {Mixed} val - The value.
 * @param {String} type - The type.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, type, cb) {
  // validate the expected type
  if (!_.includes(SUPPORTED_TYPES, type)) {
    throw new Error(`"${type}" is not a supported type`);
  }
  // validate the value
  cb(typeof val === type);
};
