import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/src/redux/reducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
