module.exports = function (express){
   var animate3d = express.Router();

   animate3d.get('/', function(req, res){
      res.sendfile('./public/view/animate3d.html');
   });
   
   return animate3d;
};
