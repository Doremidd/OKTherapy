var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Therapist = require('../models/therapistModel');

// GET a specific therapist by ID
router.get("/:id", async function (req, res, next) {
  const therapistId = req.params.id;
  try {
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      console.log("Therapist not found with ID:", therapistId);  // Debugging log
      return res.status(404).send({ message: "Therapist not found" });
    }
    console.log("Therapist found:", therapistObject);  // Debugging log
    res.json(therapist);
  } catch (err) {
    console.error('Error fetching therapist:', err.message);
    return res.status(500).send({ message: "Internal server error" });
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
