
//Mock Browser used by Processing-js for their own tests
var Browser = require('../deps/processing-js/lib/Browser');
var patch = require("./patch");

var Processing = require('../deps/processing-js/src/')(Browser);

module.exports = patch(Processing);