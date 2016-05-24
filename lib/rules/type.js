'use strict';

/**
 * Check if value has a given type,
 * @param {Mixed} value
 * @param {String} type
 * @return {Boolean}
 */
module.exports = function (value, type) {
  return typeof value === type;
};
