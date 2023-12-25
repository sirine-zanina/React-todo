const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// database
const db = require("./config/database");

// test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("INDEX");
});

// Todo routes
app.use("/todos", require("./routes/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on ${PORT}`));
