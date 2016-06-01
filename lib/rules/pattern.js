'use strict';

const log = require('../utils/log')('omv:rules:pattern');

/**
 * Check if a value matches a pattern.
 * @param {Mixed} val - The value.
 * @param {String|RegExp} pattern
 * @param {Function} cb - The callback.
 */
module.exports = function (val, pattern, cb) {
  if (typeof val != 'string') {
    log.trace(`"${val}" isnt a string`);
    return cb(true);
  }
  if (!(pattern instanceof RegExp)) {
    pattern = new RegExp(pattern);
  }
  cb(pattern.test(val));
};
