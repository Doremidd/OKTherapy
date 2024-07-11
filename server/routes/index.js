var express = require('express');
const cors = require("cors");
var router = express.Router();

require('dotenv').config();
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
