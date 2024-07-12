var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");


// GET a specific user
router.get("/:userID", async function (req, res, next) {
  const foundUser = await User.findOne({ userID: userID });
  if (!foundUser) return res.status(404).send({ message: "User not found" });
  const userObject = {
    userID,
    userName,
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
    const user = new User({ userID: sub, ...req.body });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router.put('/:id', async (req, res) => {
  // Julia's skeleton for PUT function - @Selina you can either use or rewrite
  // try {
  //   const user = await User.findById(req.params.id);
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   user.age = req.body.age !== undefined ? req.body.age : user.age;
  //   user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
  //   user.sexuality = req.body.sexuality !== undefined ? req.body.sexuality : user.sexuality;
  //   user.location = req.body.location !== undefined ? req.body.location : user.location;
  //   user.budget = req.body.budget !== undefined ? req.body.budget : user.budget;
  //   user.therapyMode = req.body.therapistModes !== undefined ? req.body.therapistModes : user.therapistModes;
  //   user.therapistGender = req.body.therapistGender !== undefined ? req.body.therapistGender : user.therapistGender;
  //   user.therapyFocus = req.body.therapyFocus !== undefined ? req.body.therapyFocus : user.therapyFocus;
  //   user.therapyMethods = req.body.therapyMethods !== undefined ? req.body.therapyMethods : user.therapyMethods;
  //   user.certification = req.body.certification !== undefined ? req.body.certification : user.certification;

  //   const updatedUser = await user.save();
  //   res.json(updatedUser);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
// });

// PUT: update a user
router.put("/:userID", async function (req, res, next) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userID: req.params.userID },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
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
