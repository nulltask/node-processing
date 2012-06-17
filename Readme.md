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
  , Processing = require('processing')
  , canvas = Processing.createElement('canvas');

fs.readFile('/path/to/sketch.pde', function(err, data) {
  var compiled = Processing.compile(data.toString('utf-8'))
    , p5 = new Processing(canvas, compiled)
    , out = fs.createWriteStream('/path/to/output.png')
    , stream = canvas.createPNGStream();

  stream.pipe(out);
});
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
