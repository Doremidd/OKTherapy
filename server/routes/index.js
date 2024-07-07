var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(console.log("Mongoose database connected"));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
