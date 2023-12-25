const Sequelize = require("sequelize");

module.exports = new Sequelize("todolist", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});
