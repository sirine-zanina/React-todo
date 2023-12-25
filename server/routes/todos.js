const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Todo = require("../models/Todo");

// get todo list

router.get("/", (req, res) =>
  Todo.findAll()
    .then((todos) => {
      console.log(todos);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
);

// add a todo
router.get("/add", (req, res) => {
  const data = {
    title: "finish all internship application",
    priority: "high",
    progress: "in progress",
  };

  let { title, priority, progress } = data;

  // Insert into table

  Todo.create({
    title,
    priority,
    progress,
  })
    .then((todo) => res.redirect("/todos"))
    .catch((err) => console.log(err));
});

module.exports = router;
