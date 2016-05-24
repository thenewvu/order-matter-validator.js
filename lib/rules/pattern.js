'use strict';

/**
 * Check if value matches a pattern.
 * @param {Mixed} value
 * @param {String|RegExp} pattern
 * @return {Boolean}
 */
module.exports = function (value, pattern) {
  if (!(pattern instanceof RegExp)) {
    pattern = new RegExp(pattern);
  }
  return pattern.test(value);
};
