const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    // need to add method to make the name is user email till the @ default
    name: String,
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 225,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);
