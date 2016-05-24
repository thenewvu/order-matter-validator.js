'use strict';

/**
 * Check if value has an exact length.
 * @param {Mixed} value
 * @param {Number} length.
 * @return {Boolean}
 */
module.exports = function (value, length) {
  return value.length === length;
};
