import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "../store/times/timeSlice";

export default configureStore({
  reducer: {
    time: timeSlice,
  },
});
