import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

/*
 * GET @ /contacts
 * Отримує список контактів поточного користувача
 */
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/contacts");
      return data.data.data; // Дістаємо сам масив контактів з об'єкта пагінації
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

/*
 * POST @ /contacts
 * body: { name, phoneNumber, email, contactType, isFavourite }
 */
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const { data } = await instance.post("/contacts", contact);
      return data.data; // Повертаємо створений контакт
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

/*
 * DELETE @ /contacts/:id
 * Бекенд повертає 204 No Content, тому thunk повертає сам contactId для фільтрації в Redux
 */
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await instance.delete(`/contacts/${contactId}`);
      return contactId; // Повертаємо ID видаленого контакту
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
