const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const { ProductSchema } = require('./models/product');

const db = mongoose.connection;

const main = async () => {

  // Get data from somewhere

  const prods = [{
    name: "first product"
  }, {
    name: "second product"
  }
  ]

  ProductSchema.insertMany(prods, (err, done) => {
    console.log('err', err);
    console.log('done', done);
  });
};

main();