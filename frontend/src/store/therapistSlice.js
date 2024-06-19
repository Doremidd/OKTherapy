import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  therapists: [
    {
      id: 1,
      location: 'Vancouver, BC',
      areaOfPractice: 'Anxiety, Depression',
      approachesUsed: 'CBT, Mindfulness',
      fee: 120,
      onlineAvailability: 'Yes',
    },
    {
      id: 2,
      location: 'Surrey, BC',
      areaOfPractice: 'Trauma, PTSD',
      approachesUsed: 'EMDR, Somatic Therapy',
      fee: 150,
      onlineAvailability: 'No',
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
