// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model and pass it using module.exports
var menuSchema = new Schema({ 
   name: String, 
   description: String,
   price: Number,
   category: String,
   restaurantId: String,
});

var MenuItem = mongoose.model('menu-item', menuSchema);

module.exports = MenuItem;