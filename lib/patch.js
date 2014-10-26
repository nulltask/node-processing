var noop = function(){};

module.exports = function(processingConstructor){
	//Wrap the Processing Constructor so we can augment node canvas as it is passed in
	return function(aCanvas, aCode, aFunctions){
		aCanvas.attachEvent = noop;
		aCanvas.getAttribute = noop;
		aCanvas.setAttribute = noop;
		aCanvas.style = {
			setProperty : noop
		};
		return new processingConstructor(aCanvas, aCode, aFunctions);
	}
}