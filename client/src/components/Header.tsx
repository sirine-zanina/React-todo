import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import { IoMdAdd } from "react-icons/io";
import ToDoCard from "./ToDoCard";

const Header = () => {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setCardOpen(true)}>
        <IoMdAdd />
        &nbsp; Add task
      </Button>
      <SelectButton id="status">
        <option value="all">ALL</option>
        <option value="incomple">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <ToDoCard cardOpen={cardOpen} setCardOpen={setCardOpen} />
    </div>
  );
};

export default Header;
