import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import { IoMdAdd } from "react-icons/io";
import ToDoCard from "./ToDoCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateFilterStatus } from "../features/todoSlice";

const Header = () => {
  const [cardOpen, setCardOpen] = useState(false);

  const filterStatus = useAppSelector((state) => state.todo.filterStatus);

  const dispatch = useAppDispatch();

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <>
      <div className={styles.appHeader}>
        <Button variant="primary" onClick={() => setCardOpen(true)}>
          <IoMdAdd />
          &nbsp; Add task
        </Button>
        <SelectButton
          id="status"
          value={filterStatus}
          onChange={(e) => updateFilter(e)}
        >
          <option value="All">ALL</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </SelectButton>
      </div>
      <ToDoCard type="add" cardOpen={cardOpen} setCardOpen={setCardOpen} />
    </>
  );
};

export default Header;
