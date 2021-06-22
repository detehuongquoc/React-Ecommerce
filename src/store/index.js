import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "userReducer"], // only navigation will be persisted
};
const reducer = combineReducers({
  productReducer,
  categoryReducer,
  cartReducer,
  userReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

// Store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
// cartReducer.subscribe(() => {
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });

// Export
export default store;
