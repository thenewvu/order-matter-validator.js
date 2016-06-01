'use strict';

const log = require('../utils/log')('omv:rules:minlen');

/**
 * Check if a value respects a minimum length.
 * @param {Mixed} val - The value.
 * @param {Number} len - The minimum length.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, len, cb) {
  if (!Array.isArray(val) && typeof val != 'string') {
    log.trace(`"${val}" is not an array or a string`);
    return cb(true);
  }
  if (len < 1) {
    log.trace(`The len is ${len} ???`);
  }
  cb(val.length >= len);
};
