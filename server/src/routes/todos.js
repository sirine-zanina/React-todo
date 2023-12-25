const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

router.route("/").get(todosController.getAllTodos());
router.route("/todos/add").post(todosController.createTodo());
router.route("/todos/edit/:id").patch(todosController.updateTodo());
router.route("/todos/delete/:id").post(todosController.deleteTodo());

module.exports = router;
