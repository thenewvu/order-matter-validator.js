'use strict';

const log = require('../utils/log')('omv:rules:min');

/**
 * Check if value has a minimum value.
 * @param {Mixed} value
 * @param {Number} min.
 * @return {Boolean}
 */
module.exports = function (value, min) {
  if (typeof value != 'number' || isNaN(value)) {
    log.warn(`"${value}" isnt a number`);
    return true;
  }
  return value >= min;
};
