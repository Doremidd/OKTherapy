import { createSlice } from '@reduxjs/toolkit';
import { getTherapistAsync } from "./thunk";

const REQUEST_STATE = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

const INITIAL_STATE = {
  therapist: null,
  getTherapist: REQUEST_STATE.IDLE,
  error: null,
};

const therapistsSlice = createSlice({
  name: 'therapist',
  initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // get therapist / GET
        .addCase(getTherapistAsync.pending, (state) => {
          state.getTherapist = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getTherapistAsync.fulfilled, (state, action) => {
          state.getTherapist = REQUEST_STATE.FULFILLED;
          state.therapist = action.payload.therapiist;
        })
        .addCase(getTherapistAsync.rejected, (state, action) => {
          state.getTherapist = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
    }
});

export default therapistsSlice.reducer;
