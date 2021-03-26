import { configureStore } from "@reduxjs/toolkit";
import actionCounter from "./slices/actionCounter";
import selectedTodoId from "./slices/selectedTodoId";
import todos from "./slices/todos";

export const store = configureStore({
  reducer: {
    todos,
    selectedTodoId,
    actionCounter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
