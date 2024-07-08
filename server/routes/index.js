var express = require('express');
const cors = require("cors");
var router = express.Router();

var mongoose = require("mongoose");
require('dotenv').config();
router.use(cors());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(console.log("Mongoose database connected"));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
