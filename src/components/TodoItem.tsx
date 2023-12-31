import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  margin-right: auto;
  border-radius: 5px;
  box-shadow: 2px 3px 6px 1px #f67280;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ItemContent = styled.div<{ checked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 18px;
  cursor: pointer;

  &::before {
    content: ${(props) => (props.checked ? "'✓'" : "''")};
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 16px;
    left: 0;
    text-align: center;
    vertical-align: middle;
    border: 1px solid ${(props) => (props.checked ? "none" : "black")};
    color: white;
    background-color: ${(props) => (props.checked ? "#f67280" : "none")};
  }
`;

const ItemTxt = styled.div<{ checked: boolean }>`
  flex: 1;
  margin-left: 12px;
  width: 90%;
  word-wrap: break-word;
  color: ${(props) => (props.checked ? "#5c567b" : "black")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  cursor: pointer;
  opacity: ${(props) => (props.checked ? "0.5" : "1")};
`;

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onCheckToggle: (id: number) => void;
  onInsertToggle: () => void;
  onChangeSelectedTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onCheckToggle,
  onInsertToggle,
  onChangeSelectedTodo
}) => {
  const { id, text, checked } = todo;

  const handleCheckToggle = () => {
    onCheckToggle(id);
  };

  return (
    <ItemContainer>
      <ItemContent
        checked={checked}
        onClick={() => {
          onCheckToggle(id);
        }}
      ></ItemContent>
      <ItemTxt
        checked={checked}
        onClick={() => {
          onChangeSelectedTodo(todo);
          onInsertToggle();
        }}
      >
        {text}
      </ItemTxt>
    </ItemContainer>
  );
};

export default TodoItem;
