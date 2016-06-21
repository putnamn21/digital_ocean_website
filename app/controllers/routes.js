module.exports = function (express, app){

var validate = require('./validate.controller.js');
var mail = require('./email.controller.js');

   
   
   
var animate3d = express.Router();

   animate3d.get('/', function(req, res){
      res.sendfile('./public/view/animate3d.html');
   });

// apply the routes to our application with the prefix /login
app.use('/animate3d', animate3d);
   
var freelance = express.Router();

   freelance.get('/', function(req, res){
      res.sendfile('./public/view/freelance.html');
   });
   
   freelance.post('/', function(req, res){
      
      var a = validate.removeCharacters(req.body);
      
      var b = mail.sendEmail(a); //returns a promise that resolves once it gets a successful message from the sendgrid server
      b.then(function(response){
         res.json({'response': response });
      }, function(error){
         res.json({'response': error });
      });
      
   });

// apply the routes to our application with the prefix /login
app.use('/', freelance);



// if any of the above routes aren't triggered with a get request, respond with the home page
app.get('*', function(req, res) {
    res.sendfile('./public/view/freelance.html'); // load the single view file (angular will handle the page changes on the front-end)
});
      
};