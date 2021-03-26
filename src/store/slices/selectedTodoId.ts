import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import { todosActionCreators } from "./todos";

export const selectedTodoSlice = createSlice({
  name: "selectedTodoId",
  initialState: null as Todo["id"] | null,
  reducers: {
    select: (state, { payload }: PayloadAction<Todo["id"]>) => payload,
  },
  extraReducers: {
    [todosActionCreators.remove.type]: (state) => null,
  },
});

export const selectedTodoActionCreators = selectedTodoSlice.actions;
export default selectedTodoSlice.reducer;
