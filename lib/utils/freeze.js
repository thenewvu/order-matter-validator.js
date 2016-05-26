'use strict';

/**
 * Deep freeze an object.
 * @param {Object} obj - The object.
 * @return {Object} The freezed object.
 */
function freeze(obj) {
  if (!obj) return obj;
  const props = Object.getOwnPropertyNames(obj);
  for (const prop of props) {
    const _prop = obj[prop];
    if (typeof _prop === 'object' && _prop != null) {
      freeze(_prop);
    }
  }
  return Object.freeze(obj);
}

module.exports = freeze;
