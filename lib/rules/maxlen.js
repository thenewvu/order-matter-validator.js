'use strict';

const log = require('../utils/log')('omv:rules:maxlen');

/**
 * Check if a value respects a maximum length.
 * @param {Array|String} val - An array or a string.
 * @param {Number} len - The expected maximum length.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, len, cb) {
  if (!Array.isArray(val) && typeof val != 'string') {
    log.trace(`"${val}" is not an array or a string`);
    return cb(true);
  }
  if (len < 1) {
    log.trace(`The maxlen is ${len} ???`);
  }
  cb(val.length <= len);
};
