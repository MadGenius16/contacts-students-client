import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/slice";

export const selectStudent = (state) => state.students.students.items;
export const selectLoading = (state) => state.students.students.loading;
export const selectError = (state) => state.students.students.error;

export const selectFilteredStudents = createSelector(
  [selectStudent, selectFilter],
  (students, filter) => {
    if (!Array.isArray(students)) return [];

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
        (student.email &&
          student.email.toLowerCase().includes(filter.toLowerCase().trim())),
    );
  },
);
