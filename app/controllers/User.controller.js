var User =  require('../models/User'); // get our User model
var validate = require('./validate.controller');

module.exports = {
   checkUser: function(user){
      
      return new Promise(function(resolve,reject){ 
         User.findOne({
            name: user.name,
         }, function(err, foundUser){
            if (err || !foundUser) {
               console.log('error: ', err);
               resolve({
                  message:'user not found',
                  success: false})
            } else {
               if (validate.checkHash(user.password, foundUser.password)){
                  foundUser.password = '';
                  resolve({message: 'user found',
                           success: true,
                           user:foundUser});
               } else {
                  resolve({message: 'password did not match',
                           success: false})
               }
            }
         });  
      })
      
   },
   createUser: function(user, res){
      var newUser = User({
         name: user.name, 
         password: user.password, 
         admin: user.admin  
      });
      
      newUser.save(function(err, newUser){
         if (err) throw err;
         console.log(newUser);
         res.send(newUser.name + ' created successfully');
      });
   }
}