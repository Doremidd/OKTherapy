// Pre-condition: userCertifications is not empty
export function convertUserCertifications(
  scrapedCertifications,
  userCertifications
) {
  const userCertificationsAbbreviated = userCertifications.map((cert) => {
    const parts = cert.split(":");
    return parts[0].trim();
  }); // Extract only the certification abbreviations, e.g. "MTA" from "MTA: Music Therapist Accredited"

  // Boolean that represents if all the user's methods are covered by the therapist's methods
  const allCovered = userCertificationsAbbreviated.every((category) =>
    scrapedCertifications.includes(category)
  );

  // Numerical score out of 1 that represents how many of the user's methods are covered by the therapist's methods
  const matchedScore =
    userCertificationsAbbreviated.filter((Certification) =>
      scrapedCertifications.includes(Certification)
    ).length / userCertificationsAbbreviated.length;

  return { allCovered, matchedScore };
}

// Example:
// const scrapedCertifications = ["MCP", "CCC"];
// const userCertifications = [
//   "ATR: Registered Art Therapist",
//   "BCATR: BC Art Therapist Registered",
//   "CCC: Canadian Certifed Counsellor",
// ];
// console.log(
//   convertUserCertifications(scrapedCertifications, userCertifications)
// );
// Result is { allCovered: false, matchedScore: 0.3333333333333333 }
// because only CCC is matched
