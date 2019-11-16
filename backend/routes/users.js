var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const ObjectId = mongoose.Types.ObjectId;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connection open!');
  // we're connected!
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
