import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("todoList");

  if (localTodoList) {
    return JSON.parse(localTodoList);
  }

  window.localStorage.setItem("todoList", JSON.stringify([]));

  return [];
};

const initialValue = {
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.push({
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArray: any[] = JSON.parse(todoList);
        todoListArray.forEach((todo: any, index: number) => {
          if (todo.id === action.payload) {
            todoListArray.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
        state.todoList = todoListArray;
      }
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
