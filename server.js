// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var cookieParser = require('cookie-parser');
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var multer = require('multer');                   // used for uploading files
    var fs = require('fs');
    var upload = multer({ dest: './public/img/',
                        limits: {files:1}
                        });
    var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var config = require('./config'); // get our config file

    var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

    // Mongoose configuration =================
    var db = mongoose.connection;

      db.on('error', console.error);
      db.once('open', function() {
        // Create your schemas and models here
        console.log("MONGO!!!!! FEED ME DATA!");

      });
    
    mongoose.connect('mongodb://localhost:27017');

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(cookieParser());
    app.set('views', __dirname + '/app/views/jade');
    app.set('view engine', 'jade');
    app.set('superSecret', config.secret); // secret variable
   


//**************************************** APP SETUP ABOVE **************************************



// MODELS =================================================================================
   

   
var Photo = require('./app/models/photo'); // get our Photo model





// ROUTES =========================================================================================

var routes = require('./app/controllers/routes/routes.js');

routes(express, app, jwt);



// END OF ROUTES ============================================================================================================================================================================================================================



// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;

app.listen( port , function(){
   console.log("Hello Chap! App listening on port 3000");
}); 


