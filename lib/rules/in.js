'use strict';

const _ = require('lodash');

/**
 * Check if a value is in an array.
 * @param {Mixed} val - The value.
 * @param {Array} arr - The array.
 * @param cb - The callback.
 */
module.exports = function (val, arr, cb) {
  // ensure arr is an array
  if (!Array.isArray(arr)) {
    throw new Error(`"${arr}" is not an array`);
  }
  // skip if val is undefined
  if (val === undefined) {
    return cb(true);
  }
  // validate val
  cb(_.includes(arr, val));
};
