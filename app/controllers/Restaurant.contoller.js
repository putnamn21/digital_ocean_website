var Restaurant = require('../models/Restaurant'); // get our model
var validate = require('./validate.controller');

module.exports = {
   check: function(restaurant){
      
      return new Promise(function(resolve,reject){ 
         Restaurant.findOne({
            name: restaurant.name,
         }, function(err, foundRestaurant){
            if (err || !foundRestaurant) {
               console.log('error: ', err);
               resolve({
                  message:'not found',
                  success: false})
            } else {
               if (validate.checkHash(restaurant.password, foundRestaurant.password)){
                  foundRestaurant.password = '';
                  resolve({message: 'Restaurant found',
                           success: true,
                           user:foundRestaurant});
               } else {
                  resolve({message: 'password did not match',
                           success: false})
               }
            }
         });  
      })
      
   },
   create: function(restaurant, res){
      
      var newRestaurant = Restaurant({
         name: restaurant.name, 
         password: restaurant.password,
      });
      
      newRestaurant.save(function(err, newRestaurant){
         if (err) throw err;
         console.log(newRestaurant);
         res.send(newRestaurant.name + ' created successfully');
      });
      
   }
}