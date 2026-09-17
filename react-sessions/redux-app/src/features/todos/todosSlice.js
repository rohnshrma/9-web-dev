import { createSlice, nanoid } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: nanoid(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const matchingTodo = state.find((todo) => todo.id === action.payload);
      if (matchingTodo) {
        matchingTodo.completed = !matchingTodo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
