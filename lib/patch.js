var noop = function(){};

module.exports = function(processingConstructor){
	
	//Wrap the Processing Constructor so we can augment node canvas as it is passed in
	function newConstructor(aCanvas){
		aCanvas.attachEvent = noop;
		aCanvas.getAttribute = noop;
		aCanvas.setAttribute = noop;
		aCanvas.style = {
			setProperty : noop
		};

		processingConstructor.apply(this, arguments);
		
	}

	newConstructor.prototype = Object.create(processingConstructor.prototype);

	// Copy static methods like compile
	for (var i in processingConstructor) {
	    newConstructor[i] = processingConstructor[i];
	}

	

	return newConstructor;
};