'use strict';

/**
 * Check if an array or a string has an exact length.
 * @param {Array|String} val - The array or string.
 * @param {Number} len - The expected length.
 * @param cb - The callback.
 */
module.exports = function (val, len, cb) {
  // validate the expected length
  if (len < 1) {
    throw new Error(`${len} is not greater than 1`);
  }
  // skip if the value isnt a string or an array
  if (!Array.isArray(val) && typeof val != 'string') {
    return cb(true);
  }
  // validate the value
  cb(val.length === len);
};
