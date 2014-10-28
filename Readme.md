
# node-processing

  [Processing.js](http://processingjs.org/) for [Node.js](http://nodejs.org)

![screenshot](https://raw.github.com/sudsy/node-processing/master/testServer.png)


## Installation

```
$ npm install processing
```

## Issues
1. Currently does not support 3d sketches 
2. Has buggy support for loadImage and loadSVG (run make test-server to see examples that are not working) 

## Usage

```javascript
var fs = require('fs')
  , sketch = __dirname + '/scribbleplotter.pde'
  , Processing = require('processing')
  , Canvas = require("canvas")
  , canvas = new Canvas(200,200);

fs.readFile(sketch, function(err, data) {
  var p5 = new Processing(canvas, data)
    , out = fs.createWriteStream(__dirname + '/scribbleplotter.png')
    , stream = canvas.createPNGStream();

  stream.pipe(out);
});
```

## Usage

```javascript
// Compile processing code into javascript, so it can be used in a LAMP webapp more effectively (no p5 lang parsing step by client needed)
// Intended to use with Grunt when developing and deploying web applications
// contribution by kroko.me

var fs = require('fs');
var Processing = require('processing');
if (process.argv.length != 5) {
    console.log("Usage: node compile.js <input-sketch.pde> <output-filename.js> <variable-name-to-store-p5js-app-into>");
    process.exit(code = 1);
}
else {
    console.log("Reading file: " + process.argv[2]);
    console.log("Output will be: " + process.argv[3]);
    console.log("Variable will be: " + process.argv[4]);
}
console.log("Compiling sketch...");

fs.readFile(process.argv[2], function(err, data) {
    var compiled = Processing.compile(data.toString('utf-8'));
    compiled = "var " + process.argv[4] + " = " + compiled + ";";
    fs.writeFile(process.argv[3], compiled, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("...done!");
        }
    });
});

// Usage in web
// var domCanvas = document.getElementById('id-of-canvas-dom-element');
// pjsPtr = new Processing(domCanvas, valiable-name-as-passed-to-this-script);
// if (pjsPtr) { }
```

## Usage - Animation

![Animated Example](https://raw.github.com/sudsy/node-processing/master/examples/animation/bobbingball.gif)

```javascript
// Generate server side animations with processing

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

  var p5 = new Processing(canvas, data);
  
  p5.onAfterDraw = function(){

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


```


## Authors

  - Seiya Konno &lt;seiya@uniba.jp&gt; ([nulltask](https://github.com/nulltask))

## Contributors

  - Reinis Adovičs ([kroko](https://github.com/kroko))
  - Ben Sudbury ([sudsy](https://github.com/sudsy))


## License

(The MIT License)

Copyright (c) 2012 Uniba Inc. &lt;info@uniba.jp&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
