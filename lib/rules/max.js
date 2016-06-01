'use strict';

const log = require('../utils/log')('omv:rules:max');

/**
 * Check if a value respects a maximum value.
 * @param {Mixed} val - The value.
 * @param {Number} max - The maximum value.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, max, cb) {
  if (typeof val != 'number' || isNaN(val)) {
    log.warn(`"${val}" isnt a number`);
    return cb(true);
  }
  cb(val <= max);
};
