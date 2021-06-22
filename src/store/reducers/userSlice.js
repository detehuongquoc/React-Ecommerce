import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer thunk
// fetch API getAllProduct

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    IsLogin(state, action) {
      state.user = action.payload;
    },
    IsLogout(state, action) {
      state.user = {};
    },
  },
  extraReducers: {},
});

//creat reducer
const userReducer = userSlice.reducer;

//export selector
export const userSelector = (state) => state.userReducer.user;

//export action

export const { IsLogin, IsLogout } = userSlice.actions;

//export reducer
export default userReducer;
