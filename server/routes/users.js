var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../model");

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
  const body = req.body;
  const user = new User({
    userName: body.userName,
    age: body.age,
    gender: body.gender,
    sexuality: body.sexuality,
    location: body.location,
    budget: body.budget,
    therapyMode: body.therapyMode,
    therapistGender: body.therapistGender,
    therapyMethods: body.therapyMethods,
    certification: body.certification,
  });
  await user.save();
  return res.send(user);
});

// PATCH: update a user
router.patch("/:username", function (req, res, next) {
  // TO DO
});

// PUT: Assign therapists to a user's assigned therapist db field
router.put("/:username/therapists", function (req, res, next) {
  // Algorithm logic
})

module.exports = router;
