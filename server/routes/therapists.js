var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

/* GET all therapists. */
router.get("/", function (req, res, next) {
  const therapists = fs.readFileSync(
    path.join(__dirname, "../data/therapists.json")
  );
  res.send(therapists);
});

router.put("/", function (req, res, next) {
  // Stretch requirement: update a therapist
});


module.exports = router;
