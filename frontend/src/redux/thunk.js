import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import UserService  from "./service";

export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async (userName) => {
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