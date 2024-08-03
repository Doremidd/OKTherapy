const therapyFocusMappings = {
  Abuse: [
    "Abuse - Emotional, Physical, Sexual",
    "Family Violence",
    "Religious/Spiritual trauma",
  ],
  Addiction: [
    "Addiction - Internet",
    "Addiction - Social Media Addiction",
    "Addictions - Family and Friends affected by",
    "Addictions - Gambling",
    "Addictions - Including Substances",
    "Addictions - Online Gaming",
    "Addictions - Pornography",
    "Addictions - Relationship",
    "Addictions - Sexual",
    "Smoking Cessation",
  ],
  "Disorders and/or Disabilities": [
    "Attention Deficit Disorder - ADHD",
    "Bipolar Disorder",
    "Borderline Personality Disorder",
    "Obsessive Compulsive Disorder",
    "Post Traumatic Stress Disorder",
    "Dissociative Disorders",
    "Learning Disabilities",
    "Neurodiversity",
  ],
  Bullying: ["Bullying - School", "Bullying - Workplace"],
  "Chronic Illness or Pain": ["Chronic Illness", "Chronic Pain"],
  "Grief or Death": [
    "Death and Dying",
    "Grief and Loss - General",
    "Grief and Loss - Pets",
    "Grief and Loss - Prenatal",
  ],
  "Anxiety/Panic Attacks": [
    "Anxiety and/or Panic",
    "COVID-19 Stress, Anxiety and Depression",
    "Holiday Stress and Anxiety",
    "Performance Enhancement",
    "Phobias",
  ],
  Depression: ["Depression", "Postpartum Depression"],
  "Body Image and Eating Disorders": [
    "Eating Disorders",
    "Weight Loss",
    "Obesity",
  ],
  "Family conflicts or parental issues": [
    "Adolescent Issues",
    "Adoption Issues",
    "Child Behaviour",
    "Child Development",
    "Child Stress and Trauma",
    "Divorce and/or Separation",
    "Family Caregiver Stress",
    "Family Conflict",
    "Family Issues",
    "Grandparenting Issues",
    "Parent/Teen Conflict",
    "Parenting Issues",
    "Stepfamily Adjustment",
    "Eldercare Issues",
  ],
  "Identity: First Nation, Gender, Sexuality, Racial, Spirituality": [
    "First Nations Issues",
    "Gender Identity Issues",
    "LGBTQ Issues",
    "Racial Identity",
    "Spirituality",
  ],
  "Relationship issues": [
    "Intimacy Issues",
    "Marriage and/or Relationship Issues",
    "Infidelity",
    "Pre-Marital Counselling",
    "Pregnancy",
    "Non-monogamy and Polyamory",
  ],
  "Health-related issues": [
    "Sleep Difficulties-Adults",
    "Sleep Difficulties-Children",
    "Brain Health",
    "Brain Injury",
    "Cancer Care and Support",
    "Caregiver Support",
    "Personal Injury",
  ],
  "Personal Growth": [
    "Career Issues",
    "Creativity",
    "Life Balance",
    "Life Transitions",
    "Personal Growth",
    "Retirement",
    "Unwanted Habits",
    "Covid-19 Life Balance",
    "Procrastination",
  ],
  "Self Harm or Suicide ideation": [
    "Self Harming Practices",
    "Suicide Bereavement",
    "Suicide Ideation / Survivor",
  ],
  "Sexual Assault": ["Sexual Assault"],
  "Stress Management": [
    "Anger Management Issues",
    "Compassion Fatigue",
    "Occupational Stress Injuries",
    "Professional Burnout",
    "Stress Management",
  ],
  Trauma: [
    "Trauma Counselling",
    "Trauma - Family and friends affected by",
    "Trauma - Teens",
    "Critical Incidents and Acute Stress",
  ],
  null: [
    "425",
    "Caregiver Support - Dementia and Alzheimers",
    "Deaf and Hard of Hearing",
    "Dementia and Alzheimer's",
    "Dreams",
    "Employee Assistance",
    "Industrial/Organizational Development",
    "Immigration",
    "Job Transition",
    "Sports Performance",
    "Supervision",
    "Teen Adjustment Issues",
    "School/Work Adjustment",
    "Testing and Evaluation",
    "Vocational Assessment",
    "Women's Issues",
    "Workplace Issues",
  ],
};

// Function to categorize scraped areas based on therapy focus mappings
function categorizedScrapedAreas(scrapedAreas) {
  let categorized = [];

  scrapedAreas.forEach((area) => {
    for (const [category, items] of Object.entries(therapyFocusMappings)) {
      if (items.includes(area)) {
        categorized.push(category);
        break;
      }
    }
  });

  return [...new Set(categorized)]; // remove duplicates with Set
}

// Pre-condition: userCategories is not empty
// Function to convert user categories and check coverage
function convertUserCategories(scrapedAreas, userCategories) {
  const scrapedCategories = categorizedScrapedAreas(scrapedAreas);

  // Boolean that represents if all the user's focuses are covered by the therapist's focuses
  const allCovered = userCategories.every((category) =>
    scrapedCategories.includes(category)
  );

  // Numerical score out of 1 that represents how many of the user's focuses are covered by the therapist's focuses
  const matchedScore =
    userCategories.filter((category) => scrapedCategories.includes(category))
      .length / userCategories.length;

  return { allCovered, matchedScore };
}

module.exports = convertUserCategories;

// Example:
//   const scrapedAreas = [
//     "Abuse - Emotional, Physical, Sexual",
//     "Family Violence",
//     "Addiction - Internet",
//     "Career Issues",
//     "Life Balance",
//     "Trauma Counselling",
//   ];
//   const userCategories = ["Abuse", "Addiction", "Sexual Assault"];
//   console.log(convertUserCategories(scrapedAreas, userCategories));
//
// Result: { allCovered: false, matchedScore: 0.6666666666666666 }
// Because: Abuse maps to Abuse - Emotional, Physical and Sexual, Addiction maps to Addiction - Internet
// and there is no mapping for Sexual Assault = 2/3
