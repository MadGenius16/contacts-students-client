import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/slice";

export const selectContacts = (state) => state.contacts.contacts.items;
export const selectLoading = (state) => state.contacts.contacts.loading;
export const selectError = (state) => state.contacts.contacts.error;
export const selectTotalPages = (state) => state.contacts.contacts.totalPages;
export const selectTotalItems = (state) => state.contacts.contacts.totalItems;
export const selectHasNextPage = (state) => state.contacts.contacts.hasNextPage;
export const selectHasPrevPage = (state) =>
  state.contacts.contacts.hasPreviousPage;
export const selectPage = (state) => state.contacts.contacts.page;
export const selectPerPage = (state) => state.contacts.contacts.perPage;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!Array.isArray(contacts)) return [];
    const normalizedFilter = (filter || "").toLowerCase().trim();

    if (!normalizedFilter) return contacts;

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        (contact.phoneNumber &&
          contact.phoneNumber.toLowerCase().includes(normalizedFilter)) ||
        (contact.email &&
          contact.email.toLowerCase().includes(normalizedFilter)),
    );
  },
);
