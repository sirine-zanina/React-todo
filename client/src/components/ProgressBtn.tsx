import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const progressBtnTypes = {
  toDo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

type ProgressBtnProps = {
  children: React.ReactNode;
  variant?: keyof typeof progressBtnTypes;
};

const ProgressBtn = ({ children, ...rest }: ProgressBtnProps) => {
  return (
    <button
      className={getClasses(styles.buttonProgress)}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ProgressBtn;
