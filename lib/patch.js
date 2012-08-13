
/**
 * Module dependencies.
 */

var path = require('path');

/**
 * Apply patching for Processing instance.
 *
 * @param {Processing} p5
 * @param {String} filePath
 * @return {Processing}
 */

module.exports = function(p5, filePath) {
  var loadImage = p5.loadImage;
    
  p5.loadImage = function(file, type, callback) {
    console.log('IMG: ', file);
    console.log('PJS: ', filePath);
    return loadImage(file, type, callback);
  };
  
  p5.canvas = p5.externals.canvas;  // add short-hand.
  
  return p5;
};
