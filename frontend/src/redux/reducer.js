import { createSlice } from "@reduxjs/toolkit";
import { createUserAsync, getUserAsync,updateUserAsync} from "./thunk";

const REQUEST_STATE = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};


const INITIAL_STATE = {
  profile: {},
  matchedTherapists: [],
  createUser: REQUEST_STATE.IDLE,
  getUser: REQUEST_STATE.IDLE,
  updateUser:REQUEST_STATE.IDLE,
  error: null,
};
export const userSlice = createSlice(
  {
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // get user / GET
        .addCase(getUserAsync.pending, (state) => {
          state.getUser = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getUserAsync.fulfilled, (state, action) => {
          state.getUser = REQUEST_STATE.FULFILLED;
          state.profile = action.payload.profile;
          state.matchedTherapists = action.payload.matchedTherapists;
        })
        .addCase(getUserAsync.rejected, (state, action) => {
          state.getUser = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        // create user / POST
        .addCase(createUserAsync.pending, (state) => {
          state.createUser = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(createUserAsync.fulfilled, (state, action) => {
          state.createUser = REQUEST_STATE.FULFILLED;
          state.profile = action.payload;
        })
        .addCase(createUserAsync.rejected, (state, action) => {
          state.createUser = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        // update user cases
        .addCase(updateUserAsync.pending, (state) => {
          state.updateUser = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => {
          state.updateUser = REQUEST_STATE.FULFILLED;
          state.profile = action.payload.profile;
        })
        .addCase(updateUserAsync.rejected, (state, action) => {
          state.updateUser = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })

    },
  }
);
export default userSlice.reducer;
