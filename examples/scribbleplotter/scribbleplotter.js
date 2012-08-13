var fs = require('fs')
  , sketch = __dirname + '/scribbleplotter.pde'
  , processing = require('../../');

fs.readFile(sketch, function(err, data) {
  var p5 = processing.createInstance(data, sketch)
    , out = fs.createWriteStream(__dirname + '/scribbleplotter.png')
    , stream = p5.canvas.createPNGStream();

  stream.pipe(out);
});
