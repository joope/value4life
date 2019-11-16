var express = require('express');
var router = express.Router();
const { ProductSchema }  = require('../models/product');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const products = await ProductSchema.find({}).exec();
  res.send(products);
});

module.exports = router;
