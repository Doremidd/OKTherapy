const express = require('express');
const Therapist = require('../model/therapistModel');
const router = express.Router();

// Get all therapists
router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

