import { createSlice } from "@reduxjs/toolkit";
import { todosActionCreators } from "./todos";

const { create, remove, toggle, update } = todosActionCreators;

export const actionCounterSlice = createSlice({
  name: "actionCounter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [create.type]: (state) => state + 1,
    [update.type]: (state) => state + 1,
    [remove.type]: (state) => state + 1,
    [toggle.type]: (state) => state + 1,
  },
});

export default actionCounterSlice.reducer;
