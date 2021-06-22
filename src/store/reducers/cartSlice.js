import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer thunk
// fetch API getAllProduct

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addProductToCart(state, action) {
      const cart = state.cart.find((carts) => carts.id === action.payload.id);

      if (cart) {
        cart.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    DeleteProductToCart(state, action) {
      state.cart = state.cart.filter((product) => product.id != action.payload);
    },
    DeleteAllProduct(state, action) {
      state.cart = [];
    },
  },
  extraReducers: {},
});

//creat reducer
const cartReducer = cartSlice.reducer;

//export selector
export const cartSelector = (state) => state.cartReducer.cart;

//export action

export const { addProductToCart, DeleteProductToCart, DeleteAllProduct } =
  cartSlice.actions;

//export reducer
export default cartReducer;
