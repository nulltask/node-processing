var fs = require('fs'),
  sketch = __dirname + '/bobbingball.pde',
  Processing = require('../../'),
  Canvas = require("canvas"),
  GIFEncoder = require("gifencoder");

 

 var canvas = new Canvas(400,400);
 var ctx = canvas.getContext('2d');

 var encoder = new GIFEncoder(400, 400);
 encoder.createReadStream().pipe(fs.createWriteStream('bobbingball.gif'));
 encoder.setDelay(40); 


fs.readFile(sketch, {"encoding": "utf-8"}, function(err, data) {
	if(err){
		console.log(err);
	}
	// console.log(data);
  var p5 = new Processing(canvas, data);
  
  p5.onAfterDraw = function(){
    // console.log("fired");
    encoder.addFrame(ctx);
  }

  encoder.start();
  
  //Finish the animation
  setTimeout(function(){
      //stop encoding the gif
      encoder.finish();
      //Stop Processing from looping
      p5.noLoop();
      
  }, 3600);


});
