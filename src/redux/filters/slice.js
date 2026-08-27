import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  filters: {
    name: "",
  },
};

const slice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    changeFilter(state, action) {
      state.filters.name = action.payload;
    },
  },
});
export const { changeFilter } = slice.actions;
export const filtersReducer = slice.reducer;
export const selectFilter = (state) => state.filter.filters.name;
