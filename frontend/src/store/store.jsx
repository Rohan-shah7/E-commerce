import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartsReducer from "./CartSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartsReducer,
    search: searchReducer,
  },
});
export default store;