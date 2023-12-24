import React from "react";
import styles from "../styles/modules/card.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";

const ToDoCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.formTitle}>
            Add task
            <div className={styles.closeButton}>
              <MdOutlineClose />
            </div>
          </h1>
          <label htmlFor="title">Task</label>
          <input
            type="text"
            id="title"
            placeholder="Type your task here..."
            autoFocus
          />
          <label htmlFor="priority">Priority</label>
          <div className={styles.buttonContainer}>
            <Button variant="high">High</Button>
            <Button variant="medium">Medium</Button>
            <Button variant="low">Low</Button>
          </div>
          <div className={styles.submitBtnContainer}>
            <Button variant="primary">Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToDoCard;
