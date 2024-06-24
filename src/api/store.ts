import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./interceptador";

const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
