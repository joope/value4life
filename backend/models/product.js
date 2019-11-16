/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  name: { type: String, default: '' },
  type: String,
  price: String,
  used: Boolean,
});


schema.index({name: 'text'})

const ProductSchema = mongoose.model('Product', schema);

module.exports = { ProductSchema}
