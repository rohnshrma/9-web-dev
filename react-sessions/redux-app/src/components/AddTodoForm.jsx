import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

const AddTodoForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanText = text.trim();

    if (cleanText === "") return;

    dispatch(addTodo(cleanText));

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What do you need to do ?"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
