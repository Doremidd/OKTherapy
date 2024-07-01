import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/src/redux/reducer";
import therapistSlice from "./src/redux/therapistSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    therapist: therapistSlice,
  },
});
