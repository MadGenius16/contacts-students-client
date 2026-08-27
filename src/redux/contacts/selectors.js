import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/slice";

export const selectContacts = (state) => state.contacts.contacts.items;
export const selectLoading = (state) => state.contacts.contacts.loading;
export const selectError = (state) => state.contacts.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (selectContacts, selectFilter) => {
    return selectContacts.filter((contact) =>
      contact.name.toLowerCase().includes(selectFilter.toLowerCase())
    );
  }
);
