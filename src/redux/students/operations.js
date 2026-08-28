import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/students");
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const addStudents = createAsyncThunk(
  "students/addStudents",
  async (student, thunkAPI) => {
    try {
      const { data } = await instance.post("/students", student);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudents",
  async (studentId, thunkAPI) => {
    try {
      await instance.delete(`/students/${studentId}`);
      return studentId; // Повертаємо ID видаленого контакту
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ studentId, updateData }, thunkAPI) => {
    try {
      const { data } = await instance.patch(
        `/students/${studentId}`,
        updateData,
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
