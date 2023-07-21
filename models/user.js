const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new Schema({
    // need to add method to make the name is user email till the @ default
    name: {
      type: String,
      default: "temporary",
    },
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

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).default("temporary"),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
