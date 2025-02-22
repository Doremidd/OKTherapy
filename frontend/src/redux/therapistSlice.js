import { createSlice } from '@reduxjs/toolkit';

const therapistsSlice = createSlice({
  name: 'therapist',
  initialState: {},
  reducers: {
    getTherapist: (state, action) => {
    return action.payload;
    }
  }
});

export const { getTherapist } = therapistsSlice.actions;

export default therapistsSlice.reducer;
