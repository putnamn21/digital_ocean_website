module.exports = {
   removeCharacters: function (data){
      var newObj = {};

      for (var key in data) {
        newObj[key] = data[key].replace(/[`~#$%^&*()_|+\-="<>\{\}\[\]\\\/]/gi, '');
      };
      
      return (newObj);
   }
}