'use strict';

const log = require('../utils/log')('omv:rules:max');

/**
 * Check if value has a minimum value.
 * @param {Mixed} value
 * @param {Number} max.
 * @return {Boolean}
 */
module.exports = function (value, max) {
  if (typeof value != 'number' || isNaN(value)) {
    log.warn(`"${value}" isnt a number`);
    return true;
  }
  return value <= max;
};
