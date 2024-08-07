const Therapist = require("../models/therapistModel");
const convertUserCertifications = require("./convertCertificates");
const convertUserApproaches = require("./convertApproaches");
const convertAreas = require("./convertAreas");
const scoreTherapists = require("./scoreLocation");

async function findTherapistMatches(foundUser) {
  const matchingCriteria = generateMatchingCriteria(foundUser);

  // Exact fit matching
  let matchedTherapists = await Therapist.find(matchingCriteria);
  matchedTherapists = removeDuplicateTherapists(matchedTherapists);
  if (matchedTherapists.length === 5) {
    return matchedTherapists;
  }

  // Secondary matching
  if (matchedTherapists.length === 0) {
    const bestRankCriteria = generateSecondaryMatchCriteria(foundUser);
    for (const criteria of bestRankCriteria) {
      const filteredCriteria = Object.fromEntries(
        Object.entries(criteria).filter(([_, v]) => v !== undefined)
      );
      let secondaryMatches = await Therapist.find(filteredCriteria);
      if (secondaryMatches.length > 0) {
        matchedTherapists = matchedTherapists.concat(secondaryMatches);
      }
    }
    matchedTherapists = removeDuplicateTherapists(matchedTherapists);
  }
  // Score each therapist
  matchedTherapists = matchedTherapists.map((therapist) =>
    scoreTherapist(therapist, foundUser)
  );
  // Sort therapists by matchedScore
  matchedTherapists.sort((a, b) => b.totalScore - a.totalScore);
  // Score top 50 based on location
  matchedTherapists = matchedTherapists.slice(0, 50);
  const userLocation = foundUser.location;
  if (userLocation && foundUser.therapyMode === "In-Person") {
    matchedTherapists = await scoreTherapists(matchedTherapists, userLocation);
    matchedTherapists.sort((a, b) => b.totalScore - a.totalScore);
  }
  // Return top 5 scored
  matchedTherapists = matchedTherapists.slice(0, 5);
  return matchedTherapists;
}

function generateMatchingCriteria(foundUser) {
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
  return matchingCriteria;
}

function generateSecondaryMatchCriteria(foundUser) {
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
  return bestRankCriteria;
}

function removeDuplicateTherapists(matchedTherapists) {
  const uniqueTherapists = [];
  const therapistNames = new Set();
  for (const therapist of matchedTherapists) {
    if (!therapistNames.has(therapist.name)) {
      uniqueTherapists.push(therapist);
      therapistNames.add(therapist.name);
    }
  }
  return uniqueTherapists;
}

function scoreTherapist(therapist, foundUser) {
  const userCertifications = foundUser.certification || [];
  const userMethods = foundUser.therapyMethods || [];
  const userFocuses = foundUser.therapyFocus || [];

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

  const genderScore = therapist.gender === foundUser.therapistGender ? 1 : 0;
  const priceRangeScore =
    therapist.fee >= foundUser.budget[0] && therapist.fee <= foundUser.budget[1]
      ? 1
      : 0;
  const therapyModeScore =
    (foundUser.therapyMode === "Online" &&
      therapist.onlineAvailability === "Yes") ||
    (foundUser.therapyMode === "InPerson" &&
      therapist.inPersonAvailability === "Yes")
      ? 1
      : 0;

  scoreCount += 3;

  const totalScore =
    scoreCount > 0
      ? (certScore +
          methodScore +
          focusScore +
          genderScore +
          priceRangeScore +
          therapyModeScore) /
        scoreCount
      : 0;

  return {
    ...therapist.toObject(),
    totalScore,
  };
}

module.exports = findTherapistMatches;