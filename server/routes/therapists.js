var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const Therapist = require('../models/therapistModel')

// GET a therapist by id
router.get("/:id", async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    res.json(therapist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET all therapists. */
router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/", function (req, res, next) {
  // Stretch requirement: update a therapist
});


module.exports = router;
