export function generateTemplate1(userProfile, user) {
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

export function generateTemplate2(userProfile, user) {
  const firstName = user.name.split(" ")[0];
  const age = userProfile.age ? `${userProfile.age}-year-old` : "";
  const gender =
    userProfile.gender && userProfile.gender !== "Prefer not to disclose"
      ? userProfile.gender.toLowerCase()
      : "individual.";
  const therapyFocus =
    userProfile.therapyFocus.length > 0
      ? ` and have been struggling with ${formatList(
          userProfile.therapyFocus
        )}.`
      : "";
  const therapyMode =
    userProfile.therapyMode && userProfile.therapyMode != "No preference"
      ? `I'm looking for ${userProfile.therapyMode.toLowerCase()} therapy.`
      : "";
  const therapyMethods =
    userProfile.therapyMethods > 0
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

function createAIPrompt(userProfile) {
  let prompt = `Can you write a first-time email to a therapist that includes the following fields:
firstName
userProfile.age,
userProfile.gender,
userProfile.location,
As well as these:\n`;

  if (userProfile.therapyFocus && userProfile.therapyFocus.length > 0) {
    prompt += `therapyFocuses: ${userProfile.therapyFocus}\n`;
  }
  if (userProfile.therapyMethods && userProfile.therapyMethods.length > 0) {
    prompt += `therapyMethods: ${userProfile.therapyMethods}\n`;
  }
  if (userProfile.therapyMode && userProfile.therapyMode !== "") {
    prompt += `therapyMode: ${userProfile.therapyMode}\n`;
  }

  prompt += `The email should be structured like this:

Greeting: Dear {insert therapist's name}
Introduction (name, age, gender, location)\n`;

  if (userProfile.therapyFocus && userProfile.therapyFocus.length > 0) {
    prompt += `Briefly describe your main concerns or issues, using the therapy focuses listed\n`;
  }

  prompt += `Include a sentence that introduces the user’s goals with a {insert goals here}\n`;

  if (userProfile.therapyMode && userProfile.therapyMode !== "") {
    prompt += `Whether the user wants therapy online, in person, or has no preference\n`;
  }

  prompt += `Ask for their availability and for a free consultation
Closing
End the email with firstName

Please return the result in between \`\`, with \${} surrounding only these 4 fields: firstName, userProfile.age, userProfile.gender, userProfile.location. Do not include triple backticks (\`\`\`)`;

  return prompt;
}

export const generateAITemplate = async (userProfile, user) => {
  const firstName = user.name.split(" ")[0];
  const prompt = createAIPrompt(userProfile);

  try {
    const response = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const template = data?.candidates[0].content.parts[0].text;
    let populatedContent = populateTemplate(template, {
      firstName,
      ...userProfile
    });
    return populatedContent;

  } catch (error) {
    console.error("Error generating content:", error);
  }
};

const populateTemplate = (template, values) => {
  return template
    .replace(/\${firstName}/g, values.firstName)
    .replace(/\${userProfile.age}/g, values.age)
    .replace(/\${userProfile.gender}/g, values.gender)
    .replace(/\${userProfile.location}/g, values.location);
};