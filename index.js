const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

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

app.listen(port, () => console.log("Listening on port 3000..."));
