
var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");


// GET a specific user
router.get("/:userName", async function (req, res, next) {
  const foundUser = await User.findOne({ userName: req.params.userName });
  if (!foundUser) return res.status(404).send({ message: "User not found" });
  const userObject = {
    userName: foundUser.userName,
    profile: {
      age: foundUser.age,
      gender: foundUser.gender,
      sexuality: foundUser.sexuality,
      location: foundUser.location,
      budget: foundUser.budget,
      therapyMode: foundUser.therapyMode,
      therapistGender: foundUser.therapistGender,
      therapyMethods: foundUser.therapyMethods,
      certification: foundUser.certification,
    },
    matchedTherapists: foundUser.matchedTherapists,
  };
  return res.send(userObject);
});

// POST a user
router.post("/", async function (req, res, next) {
  try {
    const { userName, userProfile } = req.body;
    const newUser = new User({userName,userProfile });
    await newUser.save();
    res.send(newUser);
    console.log(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// PUT: update a user
router.put("/:userName", async function (req, res, next) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName: req.params.userName},
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    console.log(updatedUser);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }

});

// PUT: Assign therapists to a user's assigned therapist db field
router.put("/:username/therapists", function (req, res, next) {
  // Algorithm logic
})

module.exports = router;
