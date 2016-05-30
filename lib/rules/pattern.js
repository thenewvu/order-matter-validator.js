'use strict';

const log = require('../utils/log')('omv:rules:pattern');

/**
 * Check if value matches a pattern.
 * @param {Mixed} value
 * @param {String|RegExp} pattern
 * @return {Boolean}
 */
module.exports = function (value, pattern) {
  if (typeof value != 'string') {
    log.warn(`"${value}" isnt a string`);
    return true;
  }
  if (!(pattern instanceof RegExp)) {
    pattern = new RegExp(pattern);
  }
  return pattern.test(value);
};
