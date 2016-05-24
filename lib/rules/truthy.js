'use strict';

/**
 * Check if value is truthy.
 * @param {Mixed} value
 * @return {Boolean}
 */
module.exports = function (value) {
  return !!value && !isNaN(value) && (value != false);
};
