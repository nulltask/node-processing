var fs = require('fs')
  , Canvas = require('canvas')
  , Processing = require('../../')
  , canvas = Processing.createElement('canvas');

fs.readFile(__dirname + '/scribbleplotter.pde', function(err, data) {
  var compiled = Processing.compile(data.toString('utf-8'))
    , p5 = new Processing(canvas, compiled)
    , out = fs.createWriteStream(__dirname + '/scribbleplotter.png')
    , stream = canvas.createPNGStream();

  stream.pipe(out);
});
