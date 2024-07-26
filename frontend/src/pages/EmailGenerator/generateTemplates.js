export const generateTemplate = (template, userProfile, user) => {
  if (user && userProfile) {
    switch (template) {
      case 0:
        return generateTemplate1(userProfile, user);
      case 1:
        return generateTemplate2(userProfile, user);
      default:
    }
  }
};

function generateTemplate1(userProfile, user) {
  const firstName = user.name.split(" ")[0];
  const age = userProfile.age ? `, ${userProfile.age}` : "";
  const location = userProfile.location
    ? `, based in ${userProfile.location}`
    : "";
  const therapyMode = userProfile.therapyMode.toLowerCase() || "";
  const therapyFocus =
    userProfile.therapyFocus && userProfile.therapyFocus.length > 0
      ? ` to help me with ${formatList(userProfile.therapyFocus)}`
      : "";
  const template = `Hi {insert name of therapist},\n\nHope you're doing well today.\n\nI'm ${firstName}${age}${location} and looking for a ${therapyMode} therapist${therapyFocus}. By starting therapy, my general aim is {insert goal here}. I've researched your background and experiences, and I believe we'd be a good fit.\n
Are you currently accepting new clients? And if so, do you have availability in the near future to do a consultation call to see if we'd be a good fit?\n
Looking forward to hearing from you soon.\n
Thank you,
${user?.name}`;
  return template;
}

function generateTemplate2(userProfile, user) {
    console.log(userProfile)
  const firstName = user.name.split(" ")[0];
  const age = userProfile.age ? `${userProfile.age}-year-old` : "";
  const gender =
    userProfile.gender && userProfile.gender !== "Prefer not to disclose"
      ? userProfile.gender.toLowerCase()
      : "individual.";
  const therapyFocus = userProfile.therapyFocus.length > 0
    ? ` and have been struggling with ${formatList(userProfile.therapyFocus)}.`
    : "";
  const therapyMode = userProfile.therapyMode && userProfile.therapyMode != "No preference"
    ? `I'm looking for ${userProfile.therapyMode.toLowerCase()} therapy.`
    : "";
  const therapyMethods = userProfile.therapyMethods > 0
    ? `specializing in ${formatList(userProfile.therapyMethods)}. `
    : "";

  const template = `Hi {insert name of therapist},\n\nMy name is ${firstName} and I came across your profile on OkTherapy. I'm a ${age} ${gender} ${therapyFocus}\n
I’m ready to work on this issue with help from a good therapist${therapyFocus}, and my goal would be to {insert goal here}.${therapyMode} ${therapyMethods}Do you offer a free phone consultation so we can see if we’re a good fit?\n
Looking forward to hearing from you soon.\n
Thank you,\n
${user.name}`;

  return template;
}

function formatList(areas) {
  if (areas.length === 0) {
    return "";
  } else if (areas.length === 1) {
    return areas[0].toLowerCase();
  } else if (areas.length === 2) {
    return areas.map((area) => area.toLowerCase()).join(" and ");
  } else {
    const lastArea = areas.pop();
    return `${areas
      .map((area) => area.toLowerCase())
      .join(", ")} and ${lastArea.toLowerCase()}`;
  }
}
