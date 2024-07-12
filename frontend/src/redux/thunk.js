import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import UserService from "./service";
import TherapistService from "./therapistService";


export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async (userID) => {
  return await UserService.getUser(userID);
});

export const createUserAsync = createAsyncThunk(
    actionTypes.CREATE_USER,
    async ({ userProfile, userID, userName }) => {
      return await UserService.createUser(userProfile,userID,userName);
    }
  );

export const updateUserAsync = updateAsyncThunk(
  actionTypes.UPDATE_USER,
  async (userProfile,userID) => {
    return await UserService.updateUser(userProfile,userID);
  }
);

export const getTherapistAsync = createAsyncThunk(actionTypes.GET_THERAPIST, async (therapistId) => {
  return await TherapistService.getTherapist(therapistId);
});