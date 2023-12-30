const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

router.route("/").get(todosController.getAllTodos);
router.route("/add").post(todosController.createTodo);
router.route("/edit/:id").patch(todosController.updateTodo);
router.route("/delete/:id").post(todosController.deleteTodo);

module.exports = router;
