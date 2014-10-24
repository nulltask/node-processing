
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require("path")
  , extname = require('path').extname
  , jsdom = require('jsdom')
  , express = require('express')
  , processing = require('../')
  , exphbs  = require('express3-handlebars')
  , app = express()
  , morgan = require('morgan')
  , serveIndex = require('serve-index');

// Set Handlebars to use the test directory
app.engine('handlebars', exphbs({
  layoutsDir: __dirname, 
  defaultLayout: 'main'
}));
app.set('views',  __dirname);
app.set('view engine', 'handlebars');

//Set up Logging
app.use(morgan('combined'));

var pathToref = "../deps/processing-js/test/ref";

//pull in list of test to merge with template
filedata = fs.readFileSync(path.join(__dirname, pathToref, 'tests.js'),'utf8');
eval(filedata);

process.on('uncaughtException', function(){});

app.get('/', function(req, res) {
  res.render('home', {"tests" : tests});
});

app.get('/test/:path(*)', function(req, res) {
  var pdePath = req.params.path
    , file = path.join(__dirname, pathToref, pdePath);
  // console.log(file);
  fs.readFile(file, function(err, data) {
    if(err){
      console.log(err);
      res.send(err);
    }
    try {
      if ('.html' === extname(path)) {
        var document = jsdom.jsdom(data + '')
          , window = document.createWindow()
          , script = document.getElementsByTagName('script')
          , src = script[script.length - 1].text
          , p5 = processing.createInstance(src, path);
  
        setTimeout(function() {
          p5.noLoop();
          p5.canvas.createPNGStream().pipe(res);
        }, 500);
      } else {
        var p5 = processing.createInstance(file);
        
        setTimeout(function() {
          p5.noLoop();
          p5.canvas.createPNGStream().pipe(res);
        }, 500);
      }
    } catch (e) {
      res.send(e);
    }
  });
});

app.listen(3000, function() {
  console.log('listening');
});
