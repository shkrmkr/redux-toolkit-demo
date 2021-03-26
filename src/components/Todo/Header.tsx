import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { todosActionCreators } from "../../store/slices/todos";

export const Header: React.FC = () => {
  const [todoDesc, setTodoDesc] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDesc(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todoDesc === "") {
        return;
      }

      dispatch(todosActionCreators.create(todoDesc));
      setTodoDesc("");
    },
    [todoDesc]
  );

  return (
    <header>
      <h1>Redux-Toolkit Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new todo"
          value={todoDesc}
          onChange={handleChange}
        />
        <button disabled={todoDesc === ""}>Create</button>
      </form>
    </header>
  );
};
