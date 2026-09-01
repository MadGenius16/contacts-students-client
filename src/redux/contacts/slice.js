import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./operations.js";

const INITIAL_STATE = {
  contacts: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const slice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.items = action.payload.data || [];
        state.contacts.page = action.payload.page || 1;
        state.contacts.perPage = action.payload.perPage || 10;
        state.contacts.totalItems = action.payload.totalItems || 0;
        state.contacts.totalPages = action.payload.totalPages || 1;
        state.contacts.hasNextPage = Boolean(action.payload.hasNextPage);
        state.contacts.hasPreviousPage = Boolean(action.payload.hasPreviousPage);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.items.push(action.payload);
        state.contacts.totalItems += 1;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        const index = state.contacts.items.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (index !== -1) {
          state.contacts.items[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact._id !== action.payload,
        );
        state.contacts.totalItems = Math.max(0, state.contacts.totalItems - 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      });
  },
});

export const contactsReducer = slice.reducer;
