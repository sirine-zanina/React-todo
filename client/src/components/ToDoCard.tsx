import React, { useState } from "react";
import styles from "../styles/modules/card.module.scss";
import { toast } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todoSlice";
import { v4 as uuid } from "uuid";
import { Progress } from "../models/TodoListItem";

type ToDoCardProps = {
  type: string;
  cardOpen: boolean;
  setCardOpen: (isOpen: boolean) => void;
};

const ToDoCard = ({ type, cardOpen, setCardOpen }: ToDoCardProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useAppDispatch();

  const handlePriorityClick = (selectedPriority: string) => {
    setPriority(selectedPriority);
  };

  const isButtonActive = (buttonPriority: string) => {
    return priority === buttonPriority;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title.");
      return;
    }
    if (title && priority) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            priority,
            progress: Progress.ToDo,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task added successfully!");
        setCardOpen(false);
      } else if (type === "update") {
        console.log("updating");
      }
    } else {
      toast.error("Please add a title!");
    }
  };

  return (
    <div>
      {cardOpen && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "update" ? "Update" : "Add"} Task
                <div
                  className={styles.closeButton}
                  onClick={() => setCardOpen(false)}
                  onKeyDown={() => setCardOpen(false)}
                  tabIndex={0}
                  role="button"
                >
                  <MdOutlineClose />
                </div>
              </h1>
              <label htmlFor="title">Task</label>
              <input
                type="text"
                id="title"
                placeholder="Type your task here..."
                autoFocus
                value={title}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="priority">Priority</label>
              <ul className={styles.buttonContainer} id="priority">
                <li>
                  <Button
                    variant="high"
                    onClick={() => handlePriorityClick("high")}
                    style={{
                      backgroundColor: isButtonActive("high") ? "#f73434" : "",
                      color: isButtonActive("high") ? "#fff" : "",
                    }}
                  >
                    High
                  </Button>
                </li>
                <li>
                  <Button
                    variant="medium"
                    onClick={() => handlePriorityClick("medium")}
                    style={{
                      backgroundColor: isButtonActive("medium")
                        ? "#f7c534"
                        : "",
                      color: isButtonActive("medium") ? "#fff" : "",
                    }}
                  >
                    Medium
                  </Button>
                </li>
                <li>
                  <Button
                    variant="low"
                    onClick={() => handlePriorityClick("low")}
                    style={{
                      backgroundColor: isButtonActive("low") ? "#0ac947" : "",
                      color: isButtonActive("low") ? "#fff" : "",
                    }}
                  >
                    Low
                  </Button>
                </li>
              </ul>

              <div className={styles.submitBtnContainer}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isButtonDisabled}
                  style={{
                    cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    backgroundColor: isButtonDisabled ? "var(--gray-3)" : "",
                  }}
                >
                  {type === "update" ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoCard;
