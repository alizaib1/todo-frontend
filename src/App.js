import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="todo-app">
      <h1> To do App</h1>
      <TodoList />
    </div>
  );
};

export default App;
