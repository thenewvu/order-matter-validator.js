'use strict';

const log = require('../utils/log')('omv:rules:len');

/**
 * Check if an array or a string has an exact length.
 * @param {Array|String} val - The array or string.
 * @param {Number} len - The expected length.
 * @param cb - The callback.
 */
module.exports = function (val, len, cb) {
  if (!Array.isArray(val) && typeof val != 'string') {
    log.trace(`"${val}" is not an array or a string`);
    return cb(true);
  }
  if (len < 1) {
    log.trace(`The len is ${len} ???`);
  }
  cb(val.length === len);
};
