import React, { useMemo } from "react";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";
import TodoItem from "./TodoItem";

const AppContent = () => {
  const todoList = useAppSelector((state: RootState) => state.todo.todoList);
  const filterStatus = useAppSelector((state) => state.todo.filterStatus);

  console.log("Original Todo List:", todoList);
  console.log("Filter Status:", filterStatus);

  const sortedTodoList = [...todoList].sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  console.log("Sorted Todo List:", sortedTodoList);

  const filteredTodoList = useMemo(() => {
    return sortedTodoList.filter((item) => {
      if (filterStatus === "All") {
        return true;
      }
      return item.progress === filterStatus;
    });
  }, [sortedTodoList, filterStatus]);

  console.log("Filtered Todo List:", filteredTodoList);

  return (
    <div>
      {filteredTodoList && filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p>No todos found</p>
      )}
    </div>
  );
};

export default AppContent;
