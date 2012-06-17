
/**
 * Module dependencies.
 */

var fs = require('fs')
  , util = require('util')
  , Canvas = require('canvas')
  , jsdom = require('jsdom').jsdom
  , document = jsdom('<html><head></head><body></body></html>')
  , Image = Canvas.Image
  , window = document.createWindow()
  , navigator = window.navigator
  , HTMLImageElement = window.HTMLImageElement
  , createElement = document.createElement
  , noop = function() {}
  , src = fs.readFileSync('./deps/processing-js/processing.js');

/**
 * Dummy function for hack.
 */

function HTMLCanvasElement() {}

/**
 * Make `Canvas` instace of `HTMLCanvasElement`
 */

Canvas.prototype.__proto__ = HTMLCanvasElement.prototype;

/**
 * Creating Processing instance.
 */

eval(src.toString('utf-8'));

/**
 * Save referece for `window` and `document`.
 */

Processing.window = window;
Processing.document = document;

/**
 * Integrate with node-canvas.
 */

Processing.createElement = document.createElement = function() {
  if ('canvas' === arguments[0]) {
    var canvas = new Canvas();

    canvas.style = { setProperty: noop };
    canvas.attachEvent = noop;
    canvas.setAttribute = noop;
    canvas.getAttribute = noop;
    canvas.hasAttribute = noop;

    return canvas;
  }
  return createElement.apply(this, arguments);
};

/**
 * Expose `Processing`.
 */

module.exports = Processing;
