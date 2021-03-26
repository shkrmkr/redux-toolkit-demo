import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Todo } from "../../types";

const initialState = {
  todos: [
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
  ] as Todo[],
  selectedTodo: null as Todo | null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<Omit<Todo, "isComplete">>) => {
      const targetTodo = state.todos.find((todo) => todo.id === payload.id);

      if (targetTodo) {
        targetTodo.desc = payload.desc;
        state.selectedTodo = targetTodo;
      }
    },
    //! non-pure way
    // create: (state, { payload }: PayloadAction<Todo["desc"]>) => {
    //   state.push({ id: nanoid(), desc: payload, isComplete: false });
    // },
    //! pure way
    create: {
      reducer: (state, { payload }: PayloadAction<Todo>) => {
        state.todos.push(payload);
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
      const targetTodo = state.todos.find((todo) => todo.id === id);

      if (targetTodo) {
        targetTodo.isComplete = !targetTodo.isComplete;
        state.selectedTodo = targetTodo;
      }
    },
    remove: (state, { payload }: PayloadAction<Todo["id"]>) => {
      const index = state.todos.findIndex((todo) => todo.id === payload);

      if (index !== -1) {
        state.todos.splice(index, 1);
        state.selectedTodo = null;
      }
    },
    select: (state, { payload }: PayloadAction<Todo["id"]>) => {
      const selectedTodo = state.todos.find((todo) => todo.id === payload);

      state.selectedTodo = selectedTodo || null;
    },
  },
});

export const todosActionCreators = todosSlice.actions;
export default todosSlice.reducer;
