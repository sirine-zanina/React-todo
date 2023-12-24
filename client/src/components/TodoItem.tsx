import React, { useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { TodoListItem } from "../models/TodoListItem";
import { format, parse } from "date-fns";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ProgressBtn from "./ProgressBtn";
import { useAppDispatch } from "../app/hooks";
import { deleteTodo } from "../features/todoSlice";
import toast from "react-hot-toast";
import ToDoCard from "./ToDoCard";

type TodoItemProps = {
  todo: TodoListItem;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const parsedDate = parse(todo.time, "dd/MM/yyyy HH:mm:ss", new Date());

  console.log(todo);

  const [updateCardOpen, setUpdateCardOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo deleted successfully");
  };

  const handleUpdate = () => {
    setUpdateCardOpen(true);
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <div className={styles.taskTitle}>
            <div className={styles.texts}>
              <span className={styles.taskAttributes}>Task</span>
              <span>{todo.title}</span>
              <span className={styles.taskDate}>
                {format(parsedDate, "dd/MM/yyyy HH:mm:ss")}
              </span>
            </div>
          </div>
          <div className={styles.taskPriority}>
            <div className={styles.texts}>
              <span className={styles.taskAttributes}>Priority</span>
              <span
                style={{
                  color:
                    todo.priority === "high"
                      ? "var(--primaryRed)"
                      : todo.priority === "medium"
                      ? "var(--primaryYellow)"
                      : todo.priority === "low"
                      ? "var(--primaryGreen)"
                      : "",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                }}
              >
                {todo.priority}
              </span>
            </div>
          </div>

          <div>
            <ProgressBtn>{todo.progress}</ProgressBtn>
          </div>
          <div className={styles.progressBar}>
            <CircularProgress variant="determinate" value={100} />
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.editIcon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div
            className={styles.deleteIcon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
      </div>
      <ToDoCard
        type="update"
        cardOpen={updateCardOpen}
        setCardOpen={setUpdateCardOpen}
      />
    </>
  );
};

export default TodoItem;
