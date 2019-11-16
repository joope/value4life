var express = require('express');
var router = express.Router();
const { ProductSchema } = require('../models/product');
const Fuse = require('fuse.js');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const products = await ProductSchema.find({}).exec();
  res.send(products);
});


router.post('/search', async (req, res, next) => {
  const { query } = req.body;
  //const products = await ProductSchema.find({ $text: { $search: query } }).limit(10).exec();
  const products = await ProductSchema.find().lean().exec()
  
  const options = {
    keys: ['name']
  }
  const fuse = new Fuse(products, options);
  const results = fuse.search(query);

  return res.json(results);
})

module.exports = router;
