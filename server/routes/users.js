var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');

// Add a new user
router.post('/', async (req, res) => {
  const user = new User({
    age: req.body.age,
    gender: req.body.gender,
    sexuality: req.body.sexuality,
    location: req.body.location,
    budget: req.body.budget,
    therapyMode: req.body.therapistModes,
    therapistGender: req.body.therapistGender,
    therapyFocus: req.body.therapyFocus,
    therapyMethods: req.body.therapyMethods,
    certification: req.body.certification,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.age = req.body.age !== undefined ? req.body.age : user.age;
    user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
    user.sexuality = req.body.sexuality !== undefined ? req.body.sexuality : user.sexuality;
    user.location = req.body.location !== undefined ? req.body.location : user.location;
    user.budget = req.body.budget !== undefined ? req.body.budget : user.budget;
    user.therapyMode = req.body.therapistModes !== undefined ? req.body.therapistModes : user.therapistModes;
    user.therapistGender = req.body.therapistGender !== undefined ? req.body.therapistGender : user.therapistGender;
    user.therapyFocus = req.body.therapyFocus !== undefined ? req.body.therapyFocus : user.therapyFocus;
    user.therapyMethods = req.body.therapyMethods !== undefined ? req.body.therapyMethods : user.therapyMethods;
    user.certification = req.body.certification !== undefined ? req.body.certification : user.certification;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
