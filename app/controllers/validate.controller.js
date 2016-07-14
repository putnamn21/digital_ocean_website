var bcrypt = require('bcrypt');
const saltRounds = 10;


//accepts key value pair objects
module.exports = {
   removeCharacters: function (data){
      var newObj = {};

      for (var key in data) {
        newObj[key] = data[key].replace(/[`~#$%^*_|+\-="<>\{\}\[\]\\\/]/gi, '');
      };
      
      return (newObj);
   },
   checkInvalidChar: function(data){
      var reggy = new RegExp('[^A-Za-z0-9_!@#$%&]');
      
      for (var key in data) {
         if(reggy.test( data[key] )){
            return false;
         }
      };
      return true;
   },
   hash: function(string){
      var hash = bcrypt.hashSync(string, saltRounds);
      return hash;
   },
   checkHash: function(string, hash){
      return bcrypt.compareSync(string, hash);
   }
}