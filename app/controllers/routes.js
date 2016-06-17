var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({ dest: './public/img/',
                        limits: {files:1}
                        });
   

var animate3d = express.Router();

   animate3d.get('/', function(req, res){
      res.sendfile('./public/view/animate3d.html');
   });

// apply the routes to our application with the prefix /login
app.use('/animate3d', animate3d);



// if any of the above routes aren't triggered with a get request, respond with the home page
app.get('*', function(req, res) {
    res.sendfile('./public/view/freelance.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = app;