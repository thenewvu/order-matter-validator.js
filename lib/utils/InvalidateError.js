'use strict';

/**
 * The Error instance contains information of
 * an invalidate value.
 */
class InvalidateError extends Error {
  constructor(opts) {
    super(opts.desc);
    this._rule = opts.rule;
    this._path = opts.path;
    this._opts = opts.opts;
    this._value = opts.value;
  }

  /**
   * Get validated rule.
   * @return {String}
   */
  get rule() {
    return this._rule;
  }

  /**
   * Get validated rule options.
   * @return {Mixed}
   */
  get otps() {
    return this._opts;
  }

  /**
   * Get validated path.
   * @return {String}
   */
  get path() {
    return this._path;
  }

  /**
   * Get validated value.
   * @return {Mixed}
   */
  get value() {
    return this._value;
  }
}

module.exports = InvalidateError;
