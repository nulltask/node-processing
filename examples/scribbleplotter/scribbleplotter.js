var fs = require('fs')
  , sketch = __dirname + '/scribbleplotter.pde'
  , Processing = require('../../')
  , Canvas = require("canvas");

 

 var canvas = new Canvas(200,200);


fs.readFile(sketch, {"encoding": "utf-8"}, function(err, data) {
	if(err){
		console.log(err);
	}
	// console.log(data);
  var p5 = new Processing(canvas, data)
    , out = fs.createWriteStream(__dirname + '/scribbleplotter.png')
    , stream = canvas.createPNGStream();


  stream.pipe(out);
});
