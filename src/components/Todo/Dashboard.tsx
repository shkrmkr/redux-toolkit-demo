import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectedTodoActionCreators } from "../../store/slices/selectedTodoId";
import { todosActionCreators } from "../../store/slices/todos";
import { Todo } from "../../types";

export const Dashboard: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const todos = useSelector<RootState, RootState["todos"]>(
    (state) => state.todos
  );
  const selectedTodoId = useSelector<RootState, RootState["selectedTodoId"]>(
    (state) => state.selectedTodoId
  );
  const dispatch = useDispatch();

  const selectTodo = (id: Todo["id"]) => {
    dispatch(selectedTodoActionCreators.select(id));
  };

  const deleteTodo = (id: Todo["id"]) => {
    dispatch(todosActionCreators.remove(id));
  };

  const toggleTodo = (id: Todo["id"]) => {
    dispatch(todosActionCreators.toggle(id));
  };

  const setEdit = () => {
    setIsEditMode(true);
    if (selectedTodoId) {
      setEditInput(selectedTodo!.desc);
    }
  };

  useEffect(() => {
    if (selectedTodoId) {
      setSelectedTodo(todos.find((todo) => todo.id === selectedTodoId)!);
    } else {
      setSelectedTodo(null);
    }
  }, [selectedTodoId, todos]);

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditInput("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTodo) {
      dispatch(
        todosActionCreators.update({ desc: editInput, id: selectedTodo.id })
      );
    }
    setIsEditMode(false);
    setEditInput("");
  };

  return (
    <div>
      <div>
        <h2>Todos</h2>
        {todos.map((todo, index) => (
          <p
            onClick={() => selectTodo(todo.id)}
            key={todo.id}
            className={todo.isComplete ? "completed" : ""}
          >
            {index}) {todo.desc}
          </p>
        ))}
      </div>

      <div>
        <h2>Selected Todo</h2>
        {selectedTodo ? (
          <div>
            {isEditMode ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button type="submit">Update</button>
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p className={selectedTodo.isComplete ? "completed" : ""}>
                  {selectedTodo.desc}
                </p>
                <div>
                  <button onClick={setEdit}>Edit</button>
                  <button onClick={() => toggleTodo(selectedTodo.id)}>
                    Toggle
                  </button>
                  <button onClick={() => deleteTodo(selectedTodo.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>nothing selected</p>
        )}
      </div>
    </div>
  );
};
