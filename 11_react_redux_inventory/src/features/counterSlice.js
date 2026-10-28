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
    decrement: (state) => {
      state.count -= 1;
    },
    custom: (state, action) => {
      state.count += +action.payload;
    },
    reset: (state) => {
      state.count = 0;
    },
    customDecrement: (state, action) => {
      state.count -= +action.payload;
    },
  },
});

export const { increment, decrement, custom, reset, customDecrement } =
  counterSlice.actions;

export default counterSlice.reducer;
