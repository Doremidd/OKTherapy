var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const Therapist = require("../models/therapistModel");
const { convertUserCertifications } = require("../util/convertCertificates");
const { convertUserApproaches } = require("../util/convertApproaches");


// GET a specific user
router.get("/:username", async function (req, res, next) {
  const userName = decodeURIComponent(req.params.username);
  const foundUser = await User.findOne({ userName: userName });
  if (!foundUser) return res.status(404).send({ message: "User not found" });
  const userObject = {
    userName,
    profile: {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      age: foundUser.age,
      gender: foundUser.gender,
      sexuality: foundUser.sexuality,
      location: foundUser.location,
      budget: foundUser.budget,
      therapyMode: foundUser.therapyMode,
      therapistGender: foundUser.therapistGender,
      therapyFocus: foundUser.therapyFocus,
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
      { userName: req.params.userName },
      req.body,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).send({ message: "User not found" });
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
    fee: { $lte: foundUser.budget[1] },
    gender: foundUser.therapistGender,
  };

  if (foundUser.therapyMode === "Online") {
    matchingCriteria.onlineAvailability = "Yes";
  }

  if (foundUser.therapyMode === "InPerson") {
    matchingCriteria.inPersonAvailability = "Yes";
  }

  if (foundUser.therapyMethods && foundUser.therapyMethods.length > 0) {
    matchingCriteria.approachesUsed = { $in: foundUser.therapyMethods };
  }

  if (foundUser.certification && foundUser.certification.length > 0) {
    let trimmedCertification = foundUser.certification.map(
      (s) => s.split(":")[0]
    );
    matchingCriteria.certification = { $in: trimmedCertification };
  }

  // Get therapists
  let matchedTherapists = await Therapist.find(matchingCriteria);

  if (matchedTherapists.length === 0) {
    const bestRankCriteria = [
      { fee: { $lte: foundUser.budget[1] } },
      { gender: foundUser.therapistGender },
      {
        onlineAvailability:
          foundUser.therapyMode === "Online" ? "Yes" : undefined,
      },
      {
        inPersonAvailability:
          foundUser.therapyMode === "InPerson" ? "Yes" : undefined,
      },
    ];

    for (const criteria of bestRankCriteria) {
      const filteredCriteria = Object.fromEntries(
        Object.entries(criteria).filter(([_, v]) => v !== undefined)
      );
      let secondaryMatches = await Therapist.find(filteredCriteria);
      if (secondaryMatches.length > 0) {
        matchedTherapists = matchedTherapists.concat(secondaryMatches);
      }
    }

    // to remove duplicate therapists
    //const uniqueTherapists = [];
    //const therapistNames = new Set();
    //for (const therapist of matchedTherapists) {
    //  if (!therapistNames.has(therapist.name)) {
    //    uniqueTherapists.push(therapist);
    //    therapistNames.add(therapist.name);
    //  }
    //}
    //matchedTherapists = uniqueTherapists;
  }

  // get each matchedScore
  const userCertifications = foundUser.certification || [];
  const userMethods = foundUser.therapyMethods || [];
  matchedTherapists = matchedTherapists.map((therapist) => {
    const scrapedCertifications = therapist.certification || [];
    const scrapedMethods = therapist.approachesUsed || [];
    const { matchedScore: certScore } = convertUserCertifications(
      scrapedCertifications,
      userCertifications
    );
    const { matchedScore: methodScore } = convertUserApproaches(
      scrapedMethods,
      userMethods
    );
    const totalScore = (certScore + methodScore) / 2;
    return { ...therapist.toObject(), totalScore };
  });

  // Sort therapists by matchedScore
  matchedTherapists.sort((a, b) => b.matchedScore - a.matchedScore);

  // get top 5
  matchedTherapists = matchedTherapists.slice(0, 5);

  // Update user profile
  foundUser.matchedTherapists = matchedTherapists;
  await foundUser.save();

  return res.send(foundUser);
});

module.exports = router;
