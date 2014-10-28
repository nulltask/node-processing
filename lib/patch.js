var Canvas = require("canvas")
var canvasImage = Canvas.Image;
var path = require("path");
var fs = require("fs");
var patchCanvas = require("./patchCanvas.js");



module.exports = function(processingConstructor){

	
	
	//Wrap the Processing Constructor so we can augment node canvas as it is passed in
	function newConstructor(aCanvas){
		
		//noop some canvas functions that are called but not needed in node
		patchCanvas(aCanvas);

		processingConstructor.apply(this, arguments);
		
		// Add an onAfterRedraw event to the instance for animation
		var superRedraw = this.redraw;
		var sub = this;
		this.redraw = function(){
			superRedraw.call(sub);
			//Fire an event to say that the frame has drawn
			if(this.onAfterDraw){
				this.onAfterDraw.call(sub);
			}
		};
	
	    
	}

	newConstructor.prototype = Object.create(processingConstructor.prototype);


	// Copy static methods like compile
	for (var i in processingConstructor) {
	    newConstructor[i] = processingConstructor[i];
	}


	


	//Make a global Image object that can be used by the image cache to load images
	Image = function (){
		// need to use parasitic inheritance due to error with normal inheritance
		var anImage = new canvasImage();
		var superSrc = anImage.src;
		Object.defineProperty(anImage, "src", {
		    get: function() {return superSrc; },
		    set: function(y) { 
		    	if(Object.prototype.toString.call(y) != '[object String]'){
		    		superSrc = y;
		    		return;
		    	}
		    	//Define an Image path
		    	var imagePath = loadImagePath || path.join(__dirname,'images');
		    	fs.readFile(path.join(imagePath, y), function(err, fileContents){
				  if (err) throw err;
				  superSrc = fileContents;
				  
				  if(anImage.onload){
				  	anImage.onload.call(anImage);
				  }
				});
		    }

		});
		return anImage;
	};

	

	return newConstructor;
};