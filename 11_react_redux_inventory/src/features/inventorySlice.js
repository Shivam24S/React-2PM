import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      name: "phone",
      qty: 1,
      price: 100000,
      category: "electronics",
    },
  ],
};
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    add: (state, action) => {
      const newProduct = {
        id: new Date().getTime(),
        ...action.payload,
      };

      state.products.push(newProduct);

      console.log("product list", [...state.products]);
    },
  },
});

export const { add } = inventorySlice.actions;

export default inventorySlice.reducer;
