var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Therapist = require('../models/therapistModel');

// GET a specific therapist by ID
router.get("/:id", async function (req, res, next) {
  const therapistId = decodeURIComponent(req.params.id);
  
  try {
    const foundTherapist = await Therapist.findById(therapistId);
    if (!foundTherapist) {
      console.log("Therapist not found with ID:", therapistId);  // Debugging log
      return res.status(404).send({ message: "Therapist not found" });
    }

    const therapistObject = {
      _id: foundTherapist._id,
      name: foundTherapist.name,
      gender: foundTherapist.gender,
      certification: foundTherapist.certification,
      location: foundTherapist.location,
      areaOfPractice: foundTherapist.areaOfPractice,
      approachesUsed: foundTherapist.approachesUsed,
      fee: foundTherapist.fee,
      onlineAvailability: foundTherapist.onlineAvailability,
      inPersonAvailability: foundTherapist.inPersonAvailability,
      phone: foundTherapist.phone,
      website: foundTherapist.website,
      image: foundTherapist.image,
    };
    
    console.log("Therapist found:", therapistObject);  // Debugging log
    return res.send(therapistObject);
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
