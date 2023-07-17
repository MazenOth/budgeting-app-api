const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  res.send([1, 2, 3]);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/budgeting-app-api")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Connection failed..."));

app.listen(3000, () => console.log("Listening on port 3000..."));
