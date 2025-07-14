import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});
export const { addProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;

