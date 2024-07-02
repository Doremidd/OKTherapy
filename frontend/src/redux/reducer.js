import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      age: 21,
      gender: "Female",
      sexuality: "Asexual",
      relationshipStatus: "Single",
      religiousBeliefs: "Christianity",
      therapyMode: "Online",
      minbudget: 100,
      maxbudget: 200,
      location: "Surrey, BC",
      language: "English",
      // noTimesPerWeek: "",
      therapyFocus: "Grief or Death",
    },
    allTherapists: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // TO DO: replace items with scraped therapists
    matchedTherapists: [],
  },
  reducers: {
    createProfile: (state, action) => {
      state.value = action.payload;
    },
    updateProfile: (state, action) => {
      state.value =action.payload;
    },
    addTherapistMatches: (state, action) => {
      state.matchedTherapists = action.payload;
    },
  },
});

export const { createProfile, updateProfile, addTherapistMatches } =
  userSlice.actions;

export default userSlice.reducer;
