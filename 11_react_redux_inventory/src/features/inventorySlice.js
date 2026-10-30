import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "phone",
      qty: 1,
      price: 100000,
      category: "electronics",
    },
  ],
  editVal: null,
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
    deleteProduct: (state, action) => {
      state.products = state.products.filter((l) => l.id !== action.payload);
    },

    setEditValue: (state, action) => {
      state.editVal = state.products.find((p) => p.id === action.payload);
    },
  },
});

export const { add, deleteProduct, setEditValue } = inventorySlice.actions;

export default inventorySlice.reducer;
