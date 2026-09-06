import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  deleteReview,
  fetchReviews,
  updateReview,
} from "./operations";
const INITIAL_STATE = {
  reviews: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    perPage: 12,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const slice = createSlice({
  name: "reviews",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews.loading = false;
        state.reviews.items = action.payload.data;
        state.reviews.page = action.payload.page;
        state.reviews.perPage = action.payload.perPage;
        state.reviews.totalItems = action.payload.totalItems;
        state.reviews.totalPages = action.payload.totalPages;
        state.reviews.hasNextPage = action.payload.hasNextPage;
        state.reviews.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviews.loading = false;
        state.reviews.error = action.payload;
      })

      .addCase(addReview.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.loading = false;
        state.reviews.items.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.reviews.loading = false;
        state.reviews.error = action.payload;
      })

      .addCase(deleteReview.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews.loading = false;
        state.reviews.items = state.reviews.items.filter(
          (review) => review._id !== action.payload,
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.reviews.loading = false;
        state.reviews.error = action.payload;
      })

      .addCase(updateReview.pending, (state) => {
        state.reviews.loading = true;
        state.reviews.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.reviews.loading = false;
        const index = state.reviews.items.findIndex(
          (review) => review._id === action.payload._id,
        );
        if (index !== -1) {
          state.reviews.items[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.reviews.loading = false;
        state.reviews.error = action.payload;
      });
  },
});
export const reviewsReducer = slice.reducer;
