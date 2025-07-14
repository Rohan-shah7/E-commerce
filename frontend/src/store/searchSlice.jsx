import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    filteredProducts: []
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    }
  }
});

export const { setSearchTerm, setFilteredProducts } = searchSlice.actions;
export default searchSlice.reducer;
