const Sequelize = require("sequelize");
const db = require("../config/database");

const Todo = db.define("todo", {
  title: {
    type: Sequelize.STRING,
  },
  priority: {
    type: Sequelize.STRING,
  },
  progress: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  
});

module.exports = Todo;
