import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "../features/counterSlice.js";

import inventorySlice from "../features/inventorySlice.js";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    inventory: inventorySlice,
  },
});

export default store;
