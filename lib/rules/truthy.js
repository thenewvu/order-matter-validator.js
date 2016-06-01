'use strict';

/**
 * Check if a value is truthy.
 * @param {Mixed} val - The value.
 * @param {undefined} opts - Should be undefined.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, opts, cb) {
  cb(!!val && !isNaN(val) && (val != false));
};
