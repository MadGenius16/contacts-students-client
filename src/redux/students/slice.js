import { createSlice } from "@reduxjs/toolkit";
import {
  addStudents,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "./operations";

const INITIAL_STATE = {
  students: {
    items: [],
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: "students",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.students.loading = true;
        state.students.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students.loading = false;
        state.students.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.students.loading = false;
        state.students.error = action.payload;
      })
      .addCase(addStudents.pending, (state) => {
        state.students.loading = true;
        state.students.error = null;
      })
      .addCase(addStudents.fulfilled, (state, action) => {
        state.students.loading = false;
        state.students.items.push(action.payload) ;
      })
      .addCase(addStudents.rejected, (state, action) => {
        state.students.loading = false;
        state.students.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.students.loading = true;
        state.students.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students.loading = false;
        state.students.items = state.students.items.filter(
          (student) => student._id !== action.payload,
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.students.loading = false;
        state.students.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.students.loading = true;
        state.students.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.students.loading = false;
        const index = state.students.items.findIndex(
          (student) => student._id === action.payload._id,
        );
        if (index !== -1) {
          state.students.items[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.students.loading = false;
        state.students.error = action.payload;
      });
  },
});
export const studentsReducer = slice.reducer;
