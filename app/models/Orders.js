// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model and pass it using module.exports
var orderSchema = new Schema({ 
   customer: String, 
   day: Date,
   start: String,
   items: Array
});

var Order = mongoose.model('order', orderSchema);

module.exports = Order;