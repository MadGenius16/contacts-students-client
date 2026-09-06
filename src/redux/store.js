import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts/slice";
import { filtersReducer } from "./filters/slice";
import { authReducer } from "./auth/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { studentsReducer } from "./students/slice";
import { reviewsReducer } from "./reviews/slice";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    students: studentsReducer,
    reviews: reviewsReducer,
    filter: filtersReducer,
    auth: persistReducer(authConfig, authReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
