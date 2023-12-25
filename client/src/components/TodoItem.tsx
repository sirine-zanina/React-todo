import React, { useEffect, useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { TodoListItem } from "../models/TodoListItem";
import { format, parse } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ProgressBtn from "./ProgressBtn";
import { useAppDispatch } from "../app/hooks";
import { deleteTodo, updateTodo } from "../features/todoSlice";
import toast from "react-hot-toast";
import ToDoCard from "./ToDoCard";
import CheckButton from "./CheckButton";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type TodoItemProps = {
  todo: TodoListItem;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const parsedDate = parse(todo.time, "dd/MM/yyyy HH:mm:ss", new Date());

  console.log(todo);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [updateCardOpen, setUpdateCardOpen] = useState(false);
  const [progress, setProgress] = useState(todo.progress);

  useEffect(() => {
    if (todo.progress === "Done") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.progress]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo deleted successfully");
  };

  const handleUpdate = () => {
    setUpdateCardOpen(true);
  };

  const handleCheck = () => {
    const newProgress = checked ? "To Do" : "Done"; // Toggle between "To Do" and "Done"
    setChecked(!checked); // Toggle the checked state
    setProgress(newProgress); // Update the local state
    dispatch(
      updateTodo({
        ...todo,
        progress: newProgress,
      })
    );
  };

  const handleProgressClick = () => {
    let newProgress = "";
    let newChecked = checked; // Preserve the current checked state

    // toggle between "To Do", "In Progress", and "Done"
    if (progress === "To Do") {
      newProgress = "In Progress";
    } else if (progress === "In Progress") {
      newProgress = "Done";
      newChecked = true; // set checked to true when moving to "Done"
    } else if (progress === "Done") {
      newProgress = "To Do";
      newChecked = false; // set checked to false when moving back to "To Do"
    }

    setProgress(newProgress); // update the local state
    setChecked(newChecked); // update the checked state
    dispatch(
      updateTodo({
        ...todo,
        progress: newProgress,
      })
    );
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.taskTitle}>
            <div className={styles.texts}>
              <span className={styles.taskAttributes}>Task</span>
              <span
                style={{
                  textDecoration: checked ? "line-through" : "none",
                  opacity: checked ? 0.7 : 1,
                }}
              >
                {todo.title}
              </span>
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
            <ProgressBtn onClick={handleProgressClick}>{progress}</ProgressBtn>
          </div>

          <div className={styles.progressBar}>
            <CircularProgressbar
              value={
                progress === "To Do"
                  ? 0
                  : progress === "In Progress"
                  ? 50
                  : progress === "Done"
                  ? 100
                  : 0
              }
              styles={{
                // make the size smaller
                root: {
                  width: "35%",
                },
                path: {
                  stroke: "var(--primaryPurple)",
                },
              }}
            />
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
        todo={todo}
        cardOpen={updateCardOpen}
        setCardOpen={setUpdateCardOpen}
      />
    </>
  );
};

export default TodoItem;
