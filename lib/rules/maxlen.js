'use strict';

const log = require('../utils/log')('omv:rules:maxlen');

/**
 * Check if value matches a maximum length.
 * @param {Mixed} value
 * @param {Number} maxlen.
 * @return {Boolean}
 */
module.exports = function (value, maxlen) {
  if (value == undefined || value == null) {
    log.warn('the validating value is undefined or null');
    return true;
  }
  if (maxlen < 1) {
    log.warn('the expected maxlen is less than 1');
  }
  return value.length <= maxlen;
};
