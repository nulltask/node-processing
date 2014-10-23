// Compile processing code into javascript, so that can be used in webpage more effectively (no p5 lang parsing step by client needed)
// Intended to use with Grunt when developing and deploying web applications
// contribution by kroko.me

var fs = require('fs');
var p5 = require('../../');
if (process.argv.length != 5) {
    console.log("Usage: node compile.js <input_sketch.pde> <output_filename.js> <variable_name_to_store_p5js_app_into>");
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
// var domCanvas = document.getElementById('id_of_canvas_dom_element');
// pjsPtr = new Processing(domCanvas, valiable_name_as_passed_to_this_script);
// if (pjsPtr) { }