// Pre-condition: userMethods is not empty
function convertUserApproaches(scrapedMethods, userMethods) {
  // Boolean that represents if all the user's methods are covered by the therapist's methods
  const allCovered = userMethods.every((category) =>
    scrapedMethods.includes(category)
  );

  // Numerical score out of 1 that represents how many of the user's methods are covered by the therapist's methods
  const matchedScore =
    userMethods.filter((method) => scrapedMethods.includes(method)).length /
    userMethods.length;

  return { allCovered, matchedScore };
}

module.exports = convertUserApproaches;

// Example:
// const scrapedMethods = [
//   "Drama Therapy",
//   "EMDR",
//   "Jungian Psychotherapy",
//   "Mindfulness approaches",
// ];
// const userMethods = [
//   "EMDR",
//   "Marriage & Couples Counselling",
//   "Mindfulness approaches",
//   "Narrative Therapy",
// ];
// console.log(convertUserAppraoches(scrapedMethods, userMethods));
// Returns { allCovered: false, matchedScore: 0.5 }
// Because EMDR and Mindfulness approaches are a match

