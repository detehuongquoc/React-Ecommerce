import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer thunk
// fetch API getAllProduct
export const getAllCategory = createAsyncThunk(
  "category/getallcategory",
  async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    console.log(response.data);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    allCategory: [],
  },
  reducers: {},
  extraReducers: {
    // Get all todos
    [getAllCategory.pending]: (state, action) => {
      console.log("Fetching todos from backend ....");
    },
    [getAllCategory.fulfilled]: (state, action) => {
      console.log("Done");
      state.allCategory = action.payload;
    },
    [getAllCategory.rejected]: (state, action) => {
      console.log("Failed to get todos!!!");
    },
  },
});

//creat reducer
const categoryReducer = categorySlice.reducer;

//export selector
export const categorySelector = (state) => state.categoryReducer.allCategory;

//export action

// export const { getAllProduct } = productSlice.actions;

//export reducer
export default categoryReducer;
