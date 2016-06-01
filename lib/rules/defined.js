'use strict';

/**
 * Check if a value is defined
 * @param {Mixed} val - The value.
 * @param {undefined} np - Should be undefined.
 * @param
 */
module.exports = function (val, np, cb) {
  cb(val !== undefined);
};
