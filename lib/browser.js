var browser = require('../deps/processing-js/lib/Browser');
var fs = require("fs");
var path = require("path");
var Canvas = require("canvas");
var patchCanvas = require("./patchCanvas.js");

//patch the Canvas constructor to return a canvas with extra attributes
//
function PatchedCanvas(){
	var aCanvas = new Canvas();
	patchCanvas(aCanvas);
	return aCanvas;
}



//Add timer events for animation
browser.window.setInterval = setInterval;
browser.window.clearInterval = clearInterval;
browser.window.setTimeout = setTimeout;

browser.ajax = function(url) {
	// console.log("replacement ajax");

	var imagePath = loadImagePath || path.join(__dirname,'images');
	return fs.readFileSync(path.join(imagePath, url)).toString();

}

var oldCreateElement = browser.window.document.createElement

browser.window.document.createElement = function (tag) {
      if (tag === "canvas") return new PatchedCanvas();
      return oldCreateElement(tag);
}

// console.log(browser.window.HTMLCanvasElement.toString());

module.exports = browser;