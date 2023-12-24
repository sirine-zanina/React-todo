import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    // todo reducer
    todo: todoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todo: todoState}
export type AppDispatch = typeof store.dispatch;
