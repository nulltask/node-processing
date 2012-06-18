
/**
 * Module dependencies.
 */

var Canvas = require('canvas')
  , noop = function() {};

/**
 * Apply patching for `Cnavas`.
 */

Canvas.prototype.style = { setProperty: noop };
Canvas.prototype.attachEvent = noop;
Canvas.prototype.setAttribute = noop;
Canvas.prototype.getAttribute = noop;
Canvas.prototype.hasAttribute = noop;
Canvas.prototype.__proto__ = noop.prototype;

/**
 * Expose `Canvas`.
 */

module.exports = Canvas;
