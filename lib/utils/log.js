'use strict';

const Debug = require('debug');

/**
 * Generate logging methods under a namespace.
 * @param {String} nsp - The namespace.
 */
function log(nsp) {
  const info = Debug(`${nsp}:info`);
  info.log = console.info.bind(console);
  const trace = Debug(`${nsp}:trace`);
  trace.log = console.trace.bind(console);
  const warn = Debug(`${nsp}:warn`);
  warn.log = console.warn.bind(console);
  return { info, trace, warn };
}

module.exports = log;
