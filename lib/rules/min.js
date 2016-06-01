'use strict';

const log = require('../utils/log')('omv:rules:min');

/**
 * Check if a value respects a minimum value.
 * @param {Mixed} val - The value.
 * @param {Number} min - The minimum value.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, min, cb) {
  if (typeof val != 'number' || isNaN(val)) {
    log.trace(`"${val}" isnt a number`);
    return cb(true);
  }
  cb(val >= min);
};
