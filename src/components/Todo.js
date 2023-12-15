import React, { useState } from "react";

const Todo = (props) => {
  const { todo, delTodo, updateTodo, editTodoHeader, clickCheckBox } = props;
  const [todoText, setTodoText] = useState(todo.text);
  const [todoEdititngId, setTodoEditingId] = useState("");
  const isEditing = todoEdititngId === todo.id;
  const getEditTodo = (id) => {
    setTodoEditingId(id);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && todoText && todoText.trim()) {
      updateTodo(todoEdititngId, todoText);
      getEditTodo("");
      e.target.blur();
    }
  };
  return (
    <div className="w-full h-10 border-2 my-1 rounded-lg flex items-center space-x-20 bg-white border-red-500">
      <div className="h-5 w-5 m-2 rounded-full bg-red-400">
        <input
          onClick={()=>clickCheckBox(todo)}
          type="checkbox"
          className="h-full w-full border-8"
        ></input>
      </div>
      {!isEditing ? (
        <label
          onDoubleClick={getEditTodo(todo.id)}
          className="flex items-center w-1/2"
        >
           {todo.text}
        </label>
      ) : (
        <input
          type="text"
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={todo.isDone?"flex items-center w-1/2 line-through":"flex items-center w-1/2"}
          defaultValue={todo.text}
        ></input>
      )}
      <div className="flex space-x-2">
        <button onClick={() => editTodoHeader(todo.id, todo.text)}>edit</button>
        <button onClick={() => delTodo(todo.id)}>remove</button>
      </div>
    </div>
  );
};

export default Todo;
