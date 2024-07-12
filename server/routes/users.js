var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const Therapist = require("../models/therapistModel");

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
    const user = new User(req.body);
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

// PATCH or PUT: update a user
// @Selina if you want you can use Julia's skeleton for a PUT (commented out above) otherwise please delete it
router.patch("/:username", function (req, res, next) {
  // TO DO
});

// PUT: Assign therapists to a user's assigned therapist db field
router.put("/:username/therapists", async function (req, res, next) {
  const userName = decodeURIComponent(req.params.username);
  const foundUser = await User.findOne({ userName: userName });
  if (!foundUser) return res.status(404).send({ message: "User not found" });

  const matchingCriteria = {
    fee: { $lte: foundUser.budget[1] }, // taking the upper end as max budget and querying on everything lower
    gender: foundUser.therapistGender,
    approachesUsed: { $in: foundUser.therapyMethods },
    certification: { $in: foundUser.certification }
  };

  if (foundUser.therapyMode === 'Online') {
    matchingCriteria.onlineAvailability = 'Yes';
  } else if (foundUser.therapyMode === 'InPerson') {
    matchingCriteria.inPersonAvailability = 'Yes';
  } else {
    matchingCriteria.onlineAvailability = 'Yes';
    matchingCriteria.inPersonAvailability = 'Yes';
  }

  const matchedTherapists = await Therapist.find(matchingCriteria);

  matchedTherapists = matchedTherapists.slice(0, 5);

  foundUser.matchedTherapists = matchedTherapists;
  await foundUser.save();

  return res.send(foundUser);
})

module.exports = router;
