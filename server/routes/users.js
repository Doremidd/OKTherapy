var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const Therapist = require("../models/therapistModel");
const convertUserCertifications = require("../util/convertCertificates");
const convertUserApproaches = require("../util/convertApproaches");
const convertAreas = require("../util/convertAreas");
const scoreTherapists = require("../util/scoreLocation");

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
    fee: { $gte: foundUser.budget[0], $lte: foundUser.budget[1] },
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
      { fee: { $gte: foundUser.budget[0], $lte: foundUser.budget[1] } },
      { gender: foundUser.therapistGender },
      {
        onlineAvailability:
          foundUser.therapyMode === "Online" ? "Yes" : undefined,
      },
      {
        inPersonAvailability:
          foundUser.therapyMode === "In-Person" ? "Yes" : undefined,
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
  }
  // to remove duplicate therapists
  const uniqueTherapists = [];
  const therapistNames = new Set();
  for (const therapist of matchedTherapists) {
    if (!therapistNames.has(therapist.name)) {
      uniqueTherapists.push(therapist);
      therapistNames.add(therapist.name);
    }
  }
  matchedTherapists = uniqueTherapists;

  // get each matchedScore
  const userCertifications = foundUser.certification || [];
  const userMethods = foundUser.therapyMethods || [];
  const userFocuses = foundUser.therapyFocus || [];
  matchedTherapists = matchedTherapists.map((therapist) => {
    const scrapedCertifications = therapist.certification || [];
    const scrapedMethods = therapist.approachesUsed || [];
    const scrapedFocuses = therapist.areaOfPractice || [];

    let certScore = 0;
    let methodScore = 0;
    let focusScore = 0;
    let scoreCount = 0;

    if (userCertifications.length > 0) {
      const { matchedScore: calculatedCertScore } = convertUserCertifications(
        scrapedCertifications,
        userCertifications
      );
      certScore = calculatedCertScore;
      scoreCount++;
    }

    if (userMethods.length > 0) {
      const { matchedScore: calculatedMethodScore } = convertUserApproaches(
        scrapedMethods,
        userMethods
      );
      methodScore = calculatedMethodScore;
      scoreCount++;
    }

    if (userFocuses.length > 0) {
      const { matchedScore: calculateFocusScore } = convertAreas(
        scrapedFocuses,
        userFocuses
      );
      focusScore = calculateFocusScore;
      scoreCount++;
    }

    const totalScore =
      scoreCount > 0 ? (certScore + methodScore + focusScore) / scoreCount : 0;
    return { ...therapist.toObject(), totalScore };
  });

  // Sort therapists by matchedScore
  matchedTherapists.sort((a, b) => b.totalScore - a.totalScore);

  // get top 10
  matchedTherapists = matchedTherapists.slice(0, 10);

  // score based on location
  const userLocation = foundUser.location;
  if (userLocation && foundUser.therapyMode === "In-Person") {
    matchedTherapists = await scoreTherapists(matchedTherapists, userLocation);
    matchedTherapists.sort((a, b) => b.totalScore - a.totalScore);
  }

  // get top 5
  matchedTherapists = matchedTherapists.slice(0, 5);

  // Update user profile
  foundUser.matchedTherapists = matchedTherapists;
  await foundUser.save();

  return res.send(foundUser);
});

module.exports = router;
