var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");


// GET a specific user
router.get("/:username", async function (req, res, next) {
  const userName = decodeURIComponent(req.params.username)
  const foundUser = await User.findOne({ userName: userName });
  if (!foundUser) return res.status(404).send({ message: "User not found" });
  const userObject = {
    userName,
    profile: {
      age: foundUser.age,
      gender: foundUser.gender,
      sexuality: foundUser.sexuality,
      location: foundUser.location,
      budget: foundUser.budget,
      therapyMode: foundUser.therapyMode,
      therapistGender: foundUser.therapistGender,
      therapyFocus:foundUser.therapyFocus,
      therapyMethods: foundUser.therapyMethods,
      certification: foundUser.certification,
    },
    matchedTherapists: foundUser.matchedTherapists,
  };
  console.log(userObject);
  return res.send(userObject);
});

// POST a user
router.post("/", async function (req, res, next) {
  try {
    const user = new User(req.body);
    console.log(user);
    await user.save();
    res.status(201).json(user);
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
router.put("/:username/therapists", async function (req, res, next) {
  const userName = decodeURIComponent(req.params.username);
  const foundUser = await User.findOne({ userName: userName });
  
  if (!foundUser) return res.status(404).send({ message: "User not found" });
  
  const matchingCriteria = {
    location: foundUser.location,
    fee: { $lte: foundUser.budget[1] },
    gender: foundUser.therapistGender,
    approachesUsed: { $in: foundUser.therapyMethods },
    certification: { $in: foundUser.certification }
  };
  
  if (foundUser.therapyMode === 'Online') {
    matchingCriteria.onlineAvailability = 'Yes';
  } 
  
  if (foundUser.therapyMode === 'InPerson') {
    matchingCriteria.inPersonAvailability = 'Yes';
  }
  
  // Get therapists
  let matchedTherapists = await Therapist.find(matchingCriteria);
  matchedTherapists = matchedTherapists.slice(0, 5);
  
  // Update user profile
  foundUser.matchedTherapists = matchedTherapists;
  await foundUser.save();
  
  return res.send(foundUser);
})

module.exports = router;
