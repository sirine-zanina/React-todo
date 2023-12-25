const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// database
const db = require("./database");

// test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false })); // for req.body
app.use(cors());

app.get("/", (req, res) => {
  res.send("INDEX");
});

// Todo routes
app.use("/todos", require("./src/routes/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on ${PORT}`));
