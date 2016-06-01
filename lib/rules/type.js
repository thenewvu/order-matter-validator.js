'use strict';

/**
 * Check if a value has a type,
 * @param {Mixed} val - The value.
 * @param {String} type - The type.
 * @param {Function} cb - The callback.
 */
module.exports = function (val, type, cb) {
  cb(typeof val === type);
};
