var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

// const readUsersFromFile = () => {
//   return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
// }

// let users = readUsersFromFile();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(users);
// });

// router.get('/therapists', (req, res) => {
//   const therapists = fs.readFileSync(path.join(__dirname, '../data/therapists.json'));
//   res.send(therapists);
// });



module.exports = router;
