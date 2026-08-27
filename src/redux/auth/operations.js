import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/login", formData);
      // console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/signup", formData);
      setAuthHeader(data.token);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const apiRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setAuthHeader(token);
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      const { data } = await instance.get("/users/current");
      setAuthHeader(token);
      // console.log(data);
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(apiLogout());
        // Unauthorized, token might be invalid
        return thunkAPI.rejectWithValue("Unauthorized! Please log in again.");
      }
      thunkAPI.rejectWithValue(error.message);
    }
  },
  // {
  //   condition: (_, thunkAPI) => {
  //     const state = thunkAPI.getState();
  //     const token = state.auth.token;
  //     if (!token) {
  //       return false;
  //     }
  //     return true;
  //   },
  // }
);

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await instance.post("/users/logout");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
