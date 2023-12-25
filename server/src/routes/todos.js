const express = require("express");
const router = express.Router();
const db = require("../../database");
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

// create a todo
router.post("/add", async (req, res) => {
  let { title, priority, progress } = req.body;

  let errors = [];

  // Validate fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!priority) {
    errors.push({ text: "Please add a priority" });
  }
  if (!progress) {
    errors.push({ text: "Please add a progress" });
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      priority,
      progress,
    });
  }

  // insert into table
  Todo.create({
    title,
    priority,
    progress,
  })
    .then((todo) => res.redirect("/todos"))
    .catch((err) => console.log(err));
});

module.exports = router;
