import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import UserService from "./service";
import TherapistService from "./therapistService";


export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async (userID) => {
  return await UserService.getUser(userName);
});

export const createUserAsync = createAsyncThunk(
    actionTypes.CREATE_USER,
    async ({ userProfile, username }) => {
      return await UserService.createUser(userProfile, username);
    }
  );

export const updateUserAsync = createAsyncThunk(
  actionTypes.UPDATE_USER
  // TO DO
);

export const getTherapistAsync = createAsyncThunk(actionTypes.GET_THERAPIST, async (therapistId) => {
  return await TherapistService.getTherapist(therapistId);
});