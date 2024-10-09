import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import authReducer from "./AuthSlice";

const persistConfig = {
  key: "root",
  storage: createIndexedDBStorage("myDB", "authStore"),
};
const persistedReducer = persistReducer(persistConfig, authReducer);

export const apiStore = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export const persistor = persistStore(apiStore);

export default { apiStore, persistor };
