const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");

// @desc Get all todos
// @route GET /todos
// @access Private
const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.findAll();

  if (!todos?.length) {
    res.status(404).json({ message: "No todos found" });
  }
  res.json(todos);
});

// @desc Create new todo
// @route POST /todos/add
// @access Private
const createTodo = asyncHandler(async (req, res) => {
  const { title, priority, progress } = req.body;

  // confirm data
  if (!title || !priority || !progress) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  // check for duplicates
  const duplicate = await Todo.findOne({ where: { title: title } });
  if (duplicate) {
    res.status(400).json({
      message: "Todo already exists",
    });
  }
  const todo = await Todo.create({
    title,
    priority,
    progress,
  });

  if (todo) {
    res.status(201).json({
      id: todo.id,
      title: todo.title,
      priority: todo.priority,
      progress: todo.progress,
    }); // 201 created
  } else {
    res.status(400).json({
      message: "Invalid todo data",
    });
  }
});

// @desc Update a todo
// @route PATCH /todos/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, priority, progress } = req.body;

  // confirm data
  if (!id || !title || !priority || !progress) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  const todo = await Todo.findByPk(id);

  if (!todo) {
    res.status(400).json({
      message: "Todo not found",
    });
  }

  // check for duplicate
  const duplicate = await Todo.findOne({ where: { title: title } });

  // allow updates to the original todo.
  if (duplicate && duplicate?.id.toString() !== id) {
    res.status(409).json({ message: "Duplicate title" }); // 409 conflict
  }

  todo.title = title;
  todo.priority = priority;
  todo.progress = progress;

  const updatedTodo = await todo.save();

  res.json({ message: `${updatedTodo.title} updated` });
});

// @desc Delete a todo
// @route DELETE /todos/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: `To do ID Required` });
  }

  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(400).json({ message: `To do not found` });
  }

  const result = await todo.destroy();

  if (result) {
    res.json({ message: `${todo.title} deleted` });
  } else {
    res.status(400).json({ message: `Unable to delete ${todo.title}` });
  }
});

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
