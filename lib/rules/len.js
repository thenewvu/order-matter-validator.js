'use strict';

const log = require('../utils/log')('omv:rules:len');

/**
 * Check if a value matches an exact length.
 * @param {Mixed} value
 * @param {Number} length.
 * @return {Boolean}
 */
module.exports = function (value, length) {
  if (value == undefined || value == null) {
    log.warn('the validating value is undefined or null');
    return true;
  }
  if (length < 1) {
    log.warn('the expected length is less than 1');
  }
  return value.length === length;
};
