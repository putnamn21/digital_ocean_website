// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('../controllers/validate.controller');

// set up a mongoose model and pass it using module.exports
var restaurantSchema = new Schema({ 
    name: String, 
    password: String 
});

restaurantSchema.pre('save', function(next){
   this.password = validate.hash(this.password);
   next();
});

var Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;