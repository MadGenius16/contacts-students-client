import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

const extractErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.data?.message)
    return error.response.data.data.message;
  if (error.response?.data?.error) return error.response.data.error;
  if (typeof error.response?.data === "string") return error.response.data;
  return error.message || "Something went wrong";
};

/*
 * GET @ /contacts
 * Отримує список контактів поточного користувача з серверною пагінацією та фільтрацією
 */
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (params = {}, thunkAPI) => {
    try {
      const queryParams = {
        page: params.page || 1,
        perPage: params.perPage || 10,
      };

      if (params.isFavourite !== undefined && params.isFavourite !== null) {
        queryParams.isFavourite = params.isFavourite;
      }

      if (params.contactType && params.contactType !== "all") {
        queryParams.contactType = params.contactType;
      }

      if (params.search && params.search.trim()) {
        queryParams.search = params.search.trim();
      }

      const { data } = await instance.get("/contacts", {
        params: queryParams,
      });

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
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
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

/*
 * PATCH @ /contacts/:id
 * body: { ...updatedFields }
 */
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, updateData }, thunkAPI) => {
    try {
      const { data } = await instance.patch(
        `/contacts/${contactId}`,
        updateData,
      );
      return data.data; // Повертаємо оновлений контакт
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
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
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);
