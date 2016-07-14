module.exports = function (express, app, jwt){

   var validate = require('../validate.controller');
   var mail = require('../email.controller');
   var userController = require('../User.controller');

  
//Animate3d Routes   
   var animate3d = require('./animate3d-routes')(express);
   app.use('/animate3d', animate3d);
   
//Authorized routes
   var authRoutes = require('./auth-routes')(app, express, jwt);
   app.use('/u', authRoutes);
   
//Home page functions
   
      app.get('/', function(req, res){
         res.sendfile('./public/view/freelance.html');
      });
   //Send Email
      app.post('/email', function(req, res){

         var a = validate.removeCharacters(req.body);

         var b = mail.sendEmail(a); //returns a promise that resolves once it gets a successful message from the sendgrid server
         b.then(function(response){
            res.json({'response': response });
         }, function(error){
            res.json({'response': error });
         });

      });
   //Login
      app.post('/login', function(req, res){
         console.log(req.body);
         var b = userController.checkUser(req.body)
            .then(function(response){
               
               if(response.success){
                  var user = response.user;
                  var tokenBody = {
                                   user: user.name,
                                   userId: user._id
                                  };
                  var token = jwt.sign(tokenBody, app.get('superSecret'), {
                     expiresIn: 60 * 60 * 24 // expires in 24 hours
                  });
                  res.cookie('access_token', token);
                  res.json({
                     message: 'successfully logged in',
                     user: user,
                     success: true
                  });
               } else {
                  res.json(response)
               }
            }, function(error){
               res.send(err);
            }); 
         
      });
   //logout
      app.get('/logout', function(req,res){
         res.clearCookie('access_token', {path:'/'})
         res.json({success: true, message: 'user logged out'});
      });
   // set up to create users  
      app.post('/superSecretUserCreate', function(req, res){
         var validUser = validate.checkInvalidChar(req.body);
         console.log(validUser);
         var user = req.body;
         if(validUser){
            user.admin = true;
            userController.createUser(user, res);
         } else {
            res.json({
               pass: false,
               message: 'password may only use a-z,0-9,!@#$%& case insensitive'
            });
         }
      });

   
   
// if any of the above routes aren't triggered with a get request, respond with the home page
      app.get('*', function(req, res) {
         res.sendfile('./public/view/freelance.html'); // load the single view file (angular will handle the page changes on the front-end)
      });
      
};