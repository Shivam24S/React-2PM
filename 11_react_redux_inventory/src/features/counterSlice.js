import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 1,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
