import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer thunk
// fetch API getAllProduct
export const getAllProduct = createAsyncThunk(
  "product/getallproduct",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    return response.data;
  }
);
export const getProductByCategory = createAsyncThunk(
  "product/getproductbycategory",
  async (category) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    console.log(response.data);
    return response.data;
  }
);
export const getSingleProduct = createAsyncThunk(
  "product/getsingleproduct",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log(response.data);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProduct: [],
    productbyCaterogy: [],
    searchvalue: "",
    singleProduct: {},
  },
  reducers: {
    SearchFilter(state, action) {
      state.searchvalue = action.payload;
    },
    emtySingleProduct(state, action) {
      state.singleProduct = "";
    },
  },
  extraReducers: {
    // Get all todos
    [getAllProduct.pending]: (state, action) => {
      console.log("Fetching todos from backend ....");
    },
    [getAllProduct.fulfilled]: (state, action) => {
      console.log("Done");
      state.allProduct = action.payload;
    },
    [getAllProduct.rejected]: (state, action) => {
      console.log("Failed to get todos!!!");
    },
    // get product by category
    [getProductByCategory.fulfilled]: (state, action) => {
      console.log("Done");
      state.allProduct = action.payload;
    },
    //get single product
    [getSingleProduct.fulfilled]: (state, action) => {
      console.log("Done");
      state.singleProduct = action.payload;
    },
  },
});

//creat reducer
const productReducer = productSlice.reducer;

//export selector
export const productSelector = (state) => state.productReducer.allProduct;
export const searchSelector = (state) => state.productReducer.searchvalue;
export const singleProductSelector = (state) =>
  state.productReducer.singleProduct;
export const productbycategorySelector = (state) =>
  state.productReducer.productbyCaterogy;

//export action

export const { SearchFilter, emtySingleProduct } = productSlice.actions;

//export reducer
export default productReducer;
