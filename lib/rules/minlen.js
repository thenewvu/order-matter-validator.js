'use strict';

const log = require('../utils/log')('omv:rules:minlen');

/**
 * Check if value has a minimum length.
 * @param {Mixed} value
 * @param {Number} minlen.
 * @return {Boolean}
 */
module.exports = function (value, minlen) {
  if (value == undefined || value == null) {
    log.warn('the validating value is undefined or null');
    return true;
  }
  if (minlen < 1) {
    log.warn('the expected minlen is less than 1');
  }
  return value.length >= minlen;
};
