import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (params = {}, thunkAPI) => {
    try {
      const queryParams = {
        page: params.page || 1,
        perPage: params.perPage || 12,
      };
      const { data } = await instance.get("/reviews", { params: queryParams });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (newReview, thunkAPI) => {
    try {
      const { data } = await instance.post("/reviews", newReview);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      await instance.delete(`/reviews/${reviewId}`);
      return reviewId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, updateData }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`/reviews/${reviewId}`, updateData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
