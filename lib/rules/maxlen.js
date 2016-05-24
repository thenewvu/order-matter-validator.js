'use strict';

/**
 * Check if value has a maximum length.
 * @param {Mixed} value
 * @param {Number} max.
 * @return {Boolean}
 */
module.exports = function (value, max) {
  return value.length <= max;
};
