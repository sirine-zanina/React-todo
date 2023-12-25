import React, { useMemo } from "react";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/modules/app.module.scss";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const todoList = useAppSelector((state: RootState) => state.todo.todoList);
  const filterStatus = useAppSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList].sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  const filteredTodoList = useMemo(() => {
    return sortedTodoList.filter((item) => {
      if (filterStatus === "All") {
        return true;
      }
      return item.progress === filterStatus;
    });
  }, [sortedTodoList, filterStatus]);

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.div className={styles.content__wrapper}>
            <motion.p className={styles.emptyText} variants={child}>
              No todos found
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppContent;
