import React, { useEffect, useState } from "react";
import styles from "../styles/modules/card.module.scss";
import { toast } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useAppDispatch } from "../app/hooks";
import { addTodo, updateTodo } from "../features/todoSlice";
import { v4 as uuid } from "uuid";
import { Progress } from "../models/TodoListItem";
import { AnimatePresence, motion } from "framer-motion";

type ToDoCardProps = {
  type: string;
  cardOpen: boolean;
  setCardOpen: (isOpen: boolean) => void;
  todo?: any;
};

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9",
    opacity: 0,
  },
};

const ToDoCard = ({ type, cardOpen, setCardOpen, todo }: ToDoCardProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setPriority(todo.priority);
    } else {
      setTitle("");
      setPriority("low");
    }
  }, [todo, cardOpen, type]);

  const dispatch = useAppDispatch();

  const isButtonActive = (buttonPriority: string) => {
    return priority === buttonPriority;
  };
  const handlePriorityClick = (selectedPriority: string) => {
    setPriority(selectedPriority);
    setIsButtonDisabled(false);
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
      } else if (type === "update") {
        // update logic here
        if (todo.title !== title || todo.priority !== priority) {
          // dispatch update action
          dispatch(
            updateTodo({
              ...todo,
              title,
              priority,
            })
          );
          toast.success("Task title updated successfully!");
        } else {
          toast.error("Please make some changes!");
        }
      }
      setCardOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {cardOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "update" ? "Update" : "Add"} Task
                <motion.div
                  className={styles.closeButton}
                  onClick={() => setCardOpen(false)}
                  onKeyDown={() => setCardOpen(false)}
                  tabIndex={0}
                  role="button"
                  initial={{ top: 40, opacity: 0 }}
                  animate={{ top: -10, opacity: 1 }}
                  exit={{ top: 40, opacity: 0 }}
                >
                  <MdOutlineClose />
                </motion.div>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToDoCard;
