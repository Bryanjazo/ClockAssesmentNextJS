import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTimes = createAsyncThunk("crypto/getcryptos", async () => {
  const response = await fetch(`http://localhost:5000/api/v1/clocks`);

  const data = await response.json();
  return data;
});

const timeSlice = createSlice({
  name: "time",
  initialState: {
    timeItems: [],
    addedItems: [],
    oneTime: "",
  },
  reducers: {
    setTime(state, action) {
      state.timeItems.push(action.payload);
    },
    cleatTime(state, action) {
      state.addedItems = [];
      let index = state.timeItems.findIndex(
        (time) => time.id === action.payload._id
      );
      if (index >= 0) {
        state.timeItems.splice(index, 1);
      } else {
        console.log("No items were found");
      }
    },
    addTime(state, action) {
      state.addedItems.push(action.payload.data);
    },
    addSingleTime(state, action) {
      state.oneTime = action.payload;
    },
    navigateHome(state, action) {
      state.timeItems = [];
      state.addedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTimes.fulfilled, (state, action) => {
      state.timeItems.push(action.payload.data);
    });
  },
});
export const { setTime, addTime, cleatTime, addSingleTime, navigateHome } =
  timeSlice.actions;

export default timeSlice.reducer;
