require("dotenv").config();

async function getCoordinates(city) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        city
      )}&key=${process.env.OPENCAGE_API}&limit=1`
    );

    if (!response.ok) {
      throw new Error("Response was not ok");
    }

    const data = await response.json();

    if (data.results.length === 0) {
      return null;
    }

    const { lat, lng } = data.results[0].geometry;
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
}

// generated with ClaudeAI prompt: what is the best function to calculate distance between cities within the province of BC
// Aug 1, 2024
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function scoreTherapists(therapists, referenceCity) {
  const referenceCoords = await getCoordinates(referenceCity);
  if (!referenceCoords) {
    return therapists.map((therapist) => ({
      ...therapist,
      totalScore: therapist.totalScore,
    }));
  }

  const scoredTherapists = await Promise.all(
    therapists.map(async (therapist) => {
      const therapistCoords = await getCoordinates(therapist.location);
      if (!therapistCoords) {
        return { ...therapist, score: 0 };
      }

      const distance = haversineDistance(
        referenceCoords.lat,
        referenceCoords.lng,
        therapistCoords.lat,
        therapistCoords.lng
      );

      // Max distance is 100 km, returns a score of 0
      const score = Math.max(0, 1 - distance / 100);
      return {
        ...therapist,
        totalScore: therapist.totalScore + parseFloat(score.toFixed(2)) / 2,
      };
    })
  );

  return scoredTherapists;
}

module.exports = scoreTherapists;
