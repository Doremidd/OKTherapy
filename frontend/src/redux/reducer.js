import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "profile",
  initialState: {
    value: {
      age: "",
      gender: "",
      sexuality: "",
      relationshipStatus: "",
      religiousBeliefs: "",
      therapyMode: "",
      budget: "",
      location: "",
      language: "",
      noTimesPerWeek: "",
      therapyFocus: "",
    },
    allTherapists: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // TO DO: replace items with scraped therapists
    matchedTherapists: [],
  },
  reducers: {
    createProfile: (state, action) => {
      state.value = action.payload;
    },
    updateProfile: (state, action) => {
      // TO DO
    },
    addTherapistMatches: (state, action) => {
      state.matchedTherapists = action.payload;
    },
  },
});

export const { createProfile, updateProfile, addTherapistMatches } =
  userSlice.actions;

export default userSlice.reducer;
