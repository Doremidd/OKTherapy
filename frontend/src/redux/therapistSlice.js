import { createSlice } from '@reduxjs/toolkit';

const therapistsSlice = createSlice({
  name: 'therapist',
  initialState: {},
  reducers: {
    setTherapist: (state, action) => action.payload,
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

export const { updateTherapist, setTherapist } =
  therapistsSlice.actions;

export default therapistsSlice.reducer;
