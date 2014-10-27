
//Mock Browser used by Processing-js for their own tests
var browser = require('./browser');
var patch = require("./patch");

var Processing = require('../deps/processing-js/src/')(browser);

module.exports = patch(Processing);