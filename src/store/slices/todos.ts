import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Todo } from "../../types";

const initialState: Todo[] = [
  {
    id: nanoid(),
    desc: "Learn Redux Toolkit",
    isComplete: false,
  },
  {
    id: nanoid(),
    desc: "Learn React",
    isComplete: true,
  },
  {
    id: nanoid(),
    desc: "Learn Redux",
    isComplete: true,
  },
];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<Omit<Todo, "isComplete">>) => {
      const targetTodo = state.find((todo) => todo.id === payload.id);

      if (targetTodo) {
        targetTodo.desc = payload.desc;
      }
    },
    //! non-pure way
    // create: (state, { payload }: PayloadAction<Todo["desc"]>) => {
    //   state.push({ id: nanoid(), desc: payload, isComplete: false });
    // },
    //! pure way
    create: {
      reducer: (state, { payload }: PayloadAction<Todo>) => {
        state.push(payload);
      },
      prepare: (desc: string) => ({
        payload: {
          id: nanoid(),
          desc,
          isComplete: false,
        },
      }),
    },
    toggle: (state, { payload: id }: PayloadAction<Todo["id"]>) => {
      const targetTodo = state.find((todo) => todo.id === id);

      if (targetTodo) {
        targetTodo.isComplete = !targetTodo.isComplete;
      }
    },
    remove: (state, { payload }: PayloadAction<Todo["id"]>) => {
      const index = state.findIndex((todo) => todo.id === payload);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const todosActionCreators = todosSlice.actions;
export default todosSlice.reducer;
