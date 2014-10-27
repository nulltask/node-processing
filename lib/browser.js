var browser = require('../deps/processing-js/lib/Browser');

browser.window.setInterval = setInterval;
browser.window.clearInterval = clearInterval;
browser.window.setTimeout = setTimeout;

module.exports = browser;