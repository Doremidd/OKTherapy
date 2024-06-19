import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  therapists: [
    {
      id: 1,
      name: 'Martin Phillips-Hing',
      gender: 'male',
      certification: 'Ph.D., R.Psych',
      location: 'Langley, BC',
      areaOfPractice: 'Anger Management Issues, Anxiety and/or Panic, Depression, Divorce and/or Separation, Grief and Loss - General, Marriage and/or Relationship Issues, Stress Management',
      approachesUsed: 'Brief Therapy, Cognitive Behavioural Therapy (CBT), Communication Skills Training, Family Systems, Humanistic Therapy, Integrative Psychotherapy, Marriage & Couples Counselling, Mindfulness approaches, Psychodynamic Therapy',
      fee: 225,
      onlineAvailability: 'No',
      inPersonAvailability: 'Yes',
      phone: '604-888-4040',
      email: ''
    },
    {
      id: 2,
      name: 'Medina Bandalli',
      gender: 'female',
      certification: 'MCP, CCC',
      location: 'Gibsons, BC',
      areaOfPractice: 'Anxiety and/or Panic, Family Issues, Life Transitions, Marriage and/or Relationship Issues, Personal Growth, Self-Esteem Issues, Trauma Counselling',
      approachesUsed: 'Cognitive Behavioural Therapy (CBT), EMDR, Emotion Focused Therapy, Psychodynamic Therapy',
      fee: 165,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'No',
      phone: '780-970-1338',
      email: 'medina@speakeasyclinic.ca'
    },
    {
      id: 3,
      name: 'Louise Chivers',
      gender: 'female',
      certification: 'M.A., RCC',
      location: 'Gibsons, BC',
      areaOfPractice: 'Anxiety and/or Panic, Obsessive Compulsive Disorder, Post Traumatic Stress Disorder, Stress Management, Womens Issues',
      approachesUsed: 'Cognitive Behavioural Therapy (CBT), EMDR, Existential-Humanistic, Video Counselling',
      fee: 175,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'Yes',
      phone: '778-848-2893',
      email: 'louisechivers55@gmail.com'
    },
    {
      id: 4,
      name: 'Jill Culver',
      gender: 'female',
      certification: 'M.S.W., RSW',
      location: 'Vancouver, BC',
      areaOfPractice: 'Career Issues, Job Transition, Life Transitions, Personal Growth, Postpartum Depression, Pregnancy, Womens Issues',
      approachesUsed: 'Brief Therapy, Coaching, Feminist Psychotherapy, Motivational Interviewing, Narrative Therapy, Online / Virtual / Telehealth Counselling, Solution Focused Therapy, Video Counselling, Vocational Counselling',
      fee: 175,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'No',
      phone: '778-765-3849',
      email: 'info@jillculver.ca'
    },
    {
      id: 5,
      name: 'Jagdeep Chahal',
      gender: 'female',
      certification: 'M.S.W., RSW',
      location: 'Richmond, BC',
      areaOfPractice: 'Abuse - Emotional, Physical, Sexual, Anxiety and/or Panic, Depression, Grief and Loss - General, Life Transitions, Marriage and/or Relationship Issues, Personal Growth',
      approachesUsed: 'Cognitive Behavioural Therapy (CBT), Cross Cultural Therapy, Emotion Focused Therapy, Family Systems, Marriage & Couples Counselling, Mindfulness approaches, Narrative Therapy, Online / Virtual / Telehealth Counselling, Psychoanalytic Therapy, Traumatic Incident Reduction (TIR)',
      fee: 140,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'No',
      phone: '604-259-6807',
      email: 'info@sharedwellness.ca'
    },
    {
      id: 6,
      name: 'David Guthrie',
      gender: 'male',
      certification: 'M.S.W., RCSW',
      location: 'Kelowna, BC',
      areaOfPractice: 'Anxiety and/or Panic, Obsessive Compulsive Disorder, Phobias, Post Traumatic Stress Disorder',
      approachesUsed: 'Acceptance & Commitment Therapy, Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy, EMDR, Interpersonal Psychotherapy, Mindfulness approaches, Online / Virtual / Telehealth Counselling',
      fee: 150,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'Yes',
      phone: '250-469-1370',
      email: ''
    },
    {
      id: 7,
      name: 'Ksenia Belova',
      gender: 'female',
      certification: 'M.A., RCC',
      location: 'Vancouver, BC',
      areaOfPractice: 'Abuse - Emotional, Physical, Sexual, Addictions - Relationship, Anxiety and/or Panic, Attention Deficit Disorder - ADHD, Depression, Grief and Loss - General, Immigration, Infidelity, Intimacy Issues, Marriage and/or Relationship Issues, Postpartum Depression, Pre-Marital Counselling, Professional Burnout, Self-Esteem Issues, Unwanted Habits',
      approachesUsed: 'Acceptance & Commitment Therapy, ADD and ADHD Coping Strategies, Cognitive Behavioural Therapy (CBT), EMDR, Emotion Focused Therapy, Emotionally Focused Couples Therapy (EFT), Gottman Method Couples Therapy, Internal Family Systems, Marriage & Couples Counselling, Mindfulness approaches, Narrative Therapy, Solution Focused Therapy',
      fee: 150,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'Yes',
      phone: '825-254-5112',
      email: 'connect@kseniacounselling.ca'
    },
    {
      id: 8,
      name: 'Bob Bircher',
      gender: 'male',
      certification: 'M.A., RCC',
      location: 'Victoria, BC',
      areaOfPractice: 'Anxiety and/or Panic, Depression, Divorce and/or Separation, Family Conflict, Family Issues, Grief and Loss - General, Infidelity, Intimacy Issues, Life Balance, Life Transitions, Marriage and/or Relationship Issues, Personal Growth, Pre-Marital Counselling, Stepfamily Adjustment, Stress Management',
      approachesUsed: 'Cognitive Behavioural Therapy (CBT), Emotion Focused Therapy, Emotionally Focused Couples Therapy (EFT), Emotionally Focused Therapy - Individuals, Gottman Method Couples Therapy, Motivational Interviewing, Narrative Therapy, Online / Virtual / Telehealth Counselling, Telephone Counselling, Video Counselling',
      fee: 150,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'No',
      phone: '778-677-7978',
      email: 'hello@gravitatecounselling.ca'
    },
    {
      id: 9,
      name: 'Nicole Alexander',
      gender: 'female',
      certification: 'M.Ed., CCC',
      location: 'Victoria, BC',
      areaOfPractice: 'Abuse - Emotional, Physical, Sexual, Addictions - Relationship, Anxiety and/or Panic, Career Issues, COVID-19 Stress, Anxiety and Depression, Depression, Grief and Loss - General, Job Transition, Life Balance, Marriage and/or Relationship Issues, Perfectionism, Personal Growth, Self-Esteem Issues, Trauma Counselling, Womens Issues',
      approachesUsed: 'Acceptance & Commitment Therapy, Adolescent Therapy, Coaching, Cognitive Behavioural Therapy (CBT), Developmental Needs Meeting Therapy, Dialectical Behaviour Therapy, Feminist Psychotherapy, Interpersonal Psychotherapy, Mindfulness approaches, Narrative Therapy, Online / Virtual / Telehealth Counselling, Solution Focused Therapy',
      fee: 145,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'Yes',
      phone: '',
      email: 'mindaheadonline@gmail.com'
    },
    {
      id: 10,
      name: 'Maryam Ahmadi-Jafari',
      gender: 'female',
      certification: 'MCP, RCC',
      location: 'Port Moody, BC',
      areaOfPractice: 'Abuse - Emotional, Physical, Sexual, Anger Management Issues, Anxiety and/or Panic, Depression, Family Issues, Grief and Loss - General, Immigration, Intimacy Issues, Job Transition, Marriage and/or Relationship Issues, Personal Growth, Self-Esteem Issues, Stress Management, Suicide Ideation / Survivor, Trauma Counselling',
      approachesUsed: 'Body Centred Therapy, Cognitive Behavioural Therapy (CBT), Emotion Focused Therapy, Gottman Method Couples Therapy, Mindfulness approaches, Online / Virtual / Telehealth Counselling, Process Work',
      fee: 155,
      onlineAvailability: 'Yes',
      inPersonAvailability: 'Yes',
      phone: '778-325-9700',
      email: 'info@consciousmindcounselling.ca'
    }
  ],
};

const therapistsSlice = createSlice({
  name: 'therapists',
  initialState,
  reducers: {
    addTherapist: (state, action) => {
      state.therapists.push(action.payload);
    },
    removeTherapist: (state, action) => {
      state.therapists = state.therapists.filter(
        (therapist) => therapist.id !== action.payload.id
      );
    },
    updateTherapist: (state, action) => {
      const index = state.therapists.findIndex(
        (therapist) => therapist.id === action.payload.id
      );
      if (index !== -1) {
        state.therapists[index] = action.payload;
      }
    },
  },
});

export const { addTherapist, removeTherapist, updateTherapist } =
  therapistsSlice.actions;

export default therapistsSlice.reducer;
