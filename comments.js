// Create web server

// Import module
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set public folder to store static files
app.use(express.static('public'));

// Default page
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

// POST request
app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
      name:req.body.name,
      comment:req.body.comment
   };

   // Read from file
   fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      data.comments.push(response);

      // Write to file
      fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
         if(err) {
            return console.log(err);
         }
         console.log("The file was saved!");
      });

      // Output JSON
      res.end(JSON.stringify(data));
   });
})

// GET request
app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
      name:req.query.name,
      comment:req.query.comment
   };

   // Read from file
   fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      data.comments.push(response);

      // Write to file
      fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
         if(err) {
            return console.log(err);
         }
         console.log("The file was saved!");
      });

      // Output JSON
      res.end(JSON.stringify(data));
   });
})

// Start server
var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Comments app listening at http://%s:%s", host, port)

})