const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    default: function () {
      let adressIndex = this.email.indexOf("@");
      let substring = this.email.substring(0, adressIndex);
      return substring[0].toUpperCase() + substring.slice(1);
    },
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
});

// Just when needed we encapsulate the token in mongoose model
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
