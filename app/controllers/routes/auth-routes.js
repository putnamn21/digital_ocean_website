module.exports = function (app, express, jwt){
  var auth = express.Router();
   
  auth.use(function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.cookies.access_token;
      
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
          if (err) {
            console.log('Failed to authenticate token.');
            return res.sendfile('./public/view/freelance.html');
          } else {
            // if everything is good, save to request for use in other routes
            req.decodedUser = decoded;    
            next();
          }
        });

      } else {

        // if there is no token return main page
        console.log('No Token Provided.');
        return res.sendfile('./public/view/freelance.html');
      }
    });

   
   auth.get('/', function(req,res){
      console.log(req.decodedUser);
      var data = {
         user: req.decodedUser,
         scripts: ['./js/.js'],
         styles: ['./css/logged-in.css']
      }
      
      res.render('logged-in', data);
   });
   
   
   
  return auth;
};