import React from "react";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";
import TodoItem from "./TodoItem";

const AppContent = () => {
  const todoList = useAppSelector((state: RootState) => state.todo.todoList);

  const sortedTodoList = [...todoList].sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  return (
    <div>
      {sortedTodoList && sortedTodoList?.length > 0
        ? sortedTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : "no todo found"}
    </div>
  );
};

export default AppContent;
