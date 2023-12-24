import React from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import { IoMdAdd } from "react-icons/io";
import ToDoCard from "./ToDoCard";

const Header = () => {
  return (
    <div className={styles.appHeader}>
      <Button variant="primary">
        <IoMdAdd />
        &nbsp; Add task
      </Button>
      <SelectButton id="status">
        <option value="all">ALL</option>
        <option value="incomple">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <ToDoCard />
    </div>
  );
};

export default Header;
