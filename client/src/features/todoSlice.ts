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
  filterStatus: "all",
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
    updateTodo: (state, action) => {
      const { id, title, priority, progress } = action.payload;

      // Update the local storage first
      const updatedTodoList = state.todoList.map((todo: any) =>
        todo.id === id ? { ...todo, title, priority, progress } : todo
      );

      window.localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      // Update the state
      return { ...state, todoList: updatedTodoList };
    },

    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
