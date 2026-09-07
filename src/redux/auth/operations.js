import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnvVar } from "../../utils/getEnvVar.js";

// Створюємо екземпляр axios із базовим URL з .env та передачею кук
export const instance = axios.create({
  baseURL: getEnvVar(
    "VITE_API_URL",
    "https://contacts-students-api.onrender.com",
  ),
  withCredentials: true,
});

// Утиліта для додавання JWT-токена в заголовок Authorization
export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Утиліта для очищення заголовка Authorization
export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /auth/register
 * body: { name, email, password }
 */
export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      // 1. Реєструємо користувача
      await instance.post("/auth/register", formData);
      // 2. Одразу логінимо для отримання accessToken та встановлення сесії
      const { data } = await instance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = data.data.accessToken;
      setAuthHeader(token);

      return {
        token,
        user: {
          name: formData.name,
          email: formData.email,
        },
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/*
 * POST @ /auth/login
 * body: { email, password }
 */
export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/auth/login", formData);
      const token = data.data.accessToken;
      setAuthHeader(token);

      return {
        token,
        user: {
          email: formData.email,
          name:
            data.data?.user?.name ||
            data.data?.name ||
            formData.name ||
            formData.email.split("@")[0],
        },
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/*
 * POST @ /auth/refresh
 * Працює через httpOnly куки сесії (sessionId, refreshToken) завдяки withCredentials: true
 */
export const apiRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      setAuthHeader(token);
      const { data } = await instance.post("/auth/refresh");
      const newToken = data.data.accessToken;
      setAuthHeader(newToken);

      return {
        token: newToken,
      };
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return false;
      }
      return true;
    },
  },
);

/*
 * POST @ /auth/logout
 */
export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await instance.post("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const apiRequestResetEmail = createAsyncThunk(
  "auth/request-reset-email",
  async ({ email }, thunkAPI) => {
    try {
      const { data } = await instance.post("/auth/request-reset-email", {
        email,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Reset email failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const apiResetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ token, password }, thunkAPI) => {
    try {
      const { data } = await instance.post("/auth/reset-password", {
        token,
        password,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Reset password failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);
