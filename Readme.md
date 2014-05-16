
# node-processing

  [Processing.js](http://processingjs.org/) for [Node.js](http://nodejs.org)

![screenshot](http://cl.ly/1R1L2S2n190c0L2j1I32/node-processing.png)

## Installation

```
$ npm install processing
```

## Usage

```javascript
var fs = require('fs')
  , sketch = __dirname + '/scribbleplotter.pde'
  , processing = require('processing');

fs.readFile(sketch, function(err, data) {
  var p5 = processing.createInstance(data, sketch)
    , out = fs.createWriteStream(__dirname + '/scribbleplotter.png')
    , stream = p5.canvas.createPNGStream();

  stream.pipe(out);
});
```

## Usage

```javascript
// Compile processing code into javascript, so it can be used in a LAMP webapp more effectively (no p5 lang parsing step by client needed)
// Intended to use with Grunt when developing and deploying web applications
// contribution by kroko.me

var fs = require('fs');
var p5 = require('processing');
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
    var compiled = p5.Processing.compile(data.toString('utf-8'));
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


## Authors

  - Seiya Konno &lt;seiya@uniba.jp&gt; ([nulltask](https://github.com/nulltask))

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
