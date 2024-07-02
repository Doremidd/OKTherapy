import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      age: 21,
      gender: "Female",
      sexuality: "Asexual",
      location: "Surrey, BC",
      budget: [100, 200],
      therapyMode: "Online",
      therapyFocus: ["Grief or Death", "Bullying"],
      therapistGender: "Female",
      therapyMethods: ["Narrative Therapy", "Solution Focused Therapy"],
      certification: [
        "Registered Psychological Assistant",
        "RCSW: Registered Clinical Social Worker",
      ],
    },
    allTherapists: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // TO DO: replace items with scraped therapists
    matchedTherapists: [],
  },
  reducers: {
    createProfile: (state, action) => {
      state.value = action.payload;
    },
    updateProfile: (state, action) => {
      state.value = action.payload;
    },
    addTherapistMatches: (state, action) => {
      state.matchedTherapists = action.payload;
    },
  },
});

export const { createProfile, updateProfile, addTherapistMatches } =
  userSlice.actions;

export default userSlice.reducer;
