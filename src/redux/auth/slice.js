import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout, apiRefresh, apiRegister } from "./operations";

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    // logOut(state) {
    //   state.user = { name: null, email: null };
    //   state.token = null;
    //   state.isLoggedIn = false;
    //   localStorage.removeItem("token");
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.pending, (state) => {
        state.error = null;
      })
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiRefresh.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiRefresh.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.isRefreshing = false;
      })
      .addCase(apiRefresh.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
        state.token = null;
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
      })
      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const authReducer = slice.reducer;
