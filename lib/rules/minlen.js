'use strict';

/**
 * Check if value has a minimum length.
 * @param {Mixed} value
 * @param {Number} min.
 * @return {Boolean}
 */
module.exports = function (value, min) {
  return value.length >= min;
};
