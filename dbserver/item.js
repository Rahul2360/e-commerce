const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Item schema
let Item = new Schema({
 name: { type: String},
 description: { type: String},
 price: { type: Number},
 imageUrl: {type: String},
},{
 collection: 'item'
});

module.exports = mongoose.model('Item', Item);