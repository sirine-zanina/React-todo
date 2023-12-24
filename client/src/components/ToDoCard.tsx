import React, { useState } from "react";
import styles from "../styles/modules/card.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";

type ToDoCardProps = {
  cardOpen: boolean;
  setCardOpen: (isOpen: boolean) => void;
};

const ToDoCard = ({ cardOpen, setCardOpen }: ToDoCardProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  const handlePriorityClick = (selectedPriority: string) => {
    setPriority(selectedPriority);
  };

  const isButtonActive = (buttonPriority: string) =>
    priority === buttonPriority;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, priority);
    setCardOpen(false);
  };

  return (
    <div>
      {cardOpen && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                Add task
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
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="priority">Priority</label>
              <ul className={styles.buttonContainer}>
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
                <Button variant="primary">Add</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoCard;
