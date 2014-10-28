
var noop = function(){};

module.exports = function(aCanvas){
	aCanvas.attachEvent = noop;
	aCanvas.getAttribute = noop;
	aCanvas.setAttribute = noop;
	aCanvas.style = {
		setProperty : noop
	};

};

