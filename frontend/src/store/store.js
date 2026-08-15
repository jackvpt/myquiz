import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

// 🧩 Slices
import userReducer from "./features/userSlice"
import selectedAccountReducer from "./features/selectedAccountSlice"
import searchAccountReducer from "./features/searchSlice"
import didYouKnowReducer from "./features/didYouKnowSlice"

// 🔗 Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  selectedAccount: selectedAccountReducer,
  searchAccount: searchAccountReducer,
  didYouKnow: didYouKnowReducer,
})

// 💾 Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist the user slice
}

// 🔁 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 🏪 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ⚠️ mandatory for redux-persist + Date
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
          "selectedAccount/setSelectedAccount",
        ],
        ignoredPaths: [
          "selectedAccount.createdAt",
          "selectedAccount.updatedAt",
          // ⚠️ File objects (contentIllustrationFile, answerImageFiles) are not serializable, so we ignore them in the redux-persist serializable check
          "didYouKnow.edited.contentIllustrationFile",
          "didYouKnow.edited.answerImageFiles",
        ],
      },
    }),
})

// 💾 Persistor
export const persistor = persistStore(store)