var express = require('express');
var router = express.Router();
const { ProductSchema }  = require('../models/product');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const products = await ProductSchema.find({}).exec();
  res.send(products);
});


router.post('/search', async (req, res, next) => {
  const { query } = req.body;
  const products = await ProductSchema.find({ $text: { $search: query } }).limit(10).exec();

  return res.json(products);
})

module.exports = router;
