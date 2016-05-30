'use strict';

const Debug = require('debug');

/**
 * Gets a namespace and returns logging methods.
 * @param {String} nsp
 */
function createLogger(nsp) {
  const info = Debug(`${nsp}:info`);
  info.log = console.info.bind(console);
  const debug = Debug(`${nsp}:debug`);
  debug.log = console.info.bind(console);
  const trace = Debug(`${nsp}:trace`);
  trace.log = console.trace.bind(console);
  const warn = Debug(`${nsp}:warn`);
  warn.log = console.warn.bind(console);
  return { info, debug, trace, warn };
}

module.exports = createLogger;
