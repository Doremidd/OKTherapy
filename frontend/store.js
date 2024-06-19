import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/src/redux/reducer";
import therapistsReducer from './therapistsSlice';

export default configureStore({
  reducer: {
    userReducer: userReducer,
    therapists: therapistsReducer,
  },
});
