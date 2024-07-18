import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "../App.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the API
    axios
      .get("http://127.0.0.1:8000/api/todos/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/todos/", todo)
      .then((response) => {
        setTodos([response.data, ...todos]);
      })
      .catch((error) => {
        console.error("There was an error adding the todo!", error);
      });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    axios
      .put(`http://127.0.0.1:8000/api/todos/${todoId}/`, newValue)
      .then((response) => {
        setTodos((prev) =>
          prev.map((item) => (item.id === todoId ? response.data : item))
        );
      })
      .catch((error) => {
        console.error("There was an error updating the todo!", error);
      });
  };

  const removeTodo = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/todos/${id}/`)
      .then(() => {
        setTodos([...todos].filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the todo!", error);
      });
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        axios
          .put(`http://127.0.0.1:8000/api/todos/${id}/`, todo)
          .then((response) => {
            setTodos((prev) =>
              prev.map((item) => (item.id === id ? response.data : item))
            );
          })
          .catch((error) => {
            console.error("There was an error updating the todo!", error);
          });
      }
      return todo;
    });
  };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
