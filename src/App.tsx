import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Template from "./components/Template";
import TodoList from "./components/TodoList";
import TodoInsert from "./components/TodoInsert";

const AddTodoBtn = styled.div`
  position: fixed;
  right: 36px;
  bottom: 36px;
  z-index: 100;
  width: 80px;
  height: 80px;
  cursor: pointer;
  font-size: 5rem;
  color: #f67280;
`;

// let nextId = 4;

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const nextId = useRef(4);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(!insertToggle);
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true
    },
    {
      id: 2,
      text: "할일 2",
      checked: false
    },
    {
      id: 3,
      text: "할일 3",
      checked: true
    }
  ]);

  const onInsertTodo = (text: string) => {
    if (text === "") {
      return alert("할 일을 입력해주세요.");
    } else {
      const todo = {
        id: nextId.current,
        text,
        checked: false
      };
      setTodos((todos) => todos.concat(todo));
      nextId.current += 1;
    }
  };

  const onCheckToggle = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onChangeSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onRemove = (id: number) => {
    onInsertToggle();
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    // setSelectedTodo(null);
  };

  const onUpdate = (id: number, text: string) => {
    onInsertToggle();
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Template screenWidth={windowWidth} todoLength={todos.length}>
          <TodoList
            todos={todos}
            onCheckToggle={onCheckToggle}
            onInsertToggle={onInsertToggle}
            onChangeSelectedTodo={onChangeSelectedTodo}
          ></TodoList>
          <AddTodoBtn onClick={onInsertToggle}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </AddTodoBtn>
          {insertToggle && (
            <TodoInsert
              selectedTodo={selectedTodo}
              onInsertToggle={onInsertToggle}
              onInsertTodo={onInsertTodo}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          )}
        </Template>
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* {!isNavToggle && (
          <Routes>
            <Route
              path="/"
              element={<Main windowWidth={windowWidth} />}
            ></Route>
            <Route
              path="/about/*"
              element={<About windowWidth={windowWidth} />}
            ></Route>
          </Routes>
        )} */
}

{
  /* {isNavToggle && (
          <Nav isNavToggle={isNavToggle} onToggle={handleToggle}></Nav>
        )}
        <Footer onToggle={handleToggle} windowWidth={windowWidth} /> */
}
