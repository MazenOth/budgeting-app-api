const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }
  user = new User(_.pick(req.body, ["email", "password"]));
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  user = await user.save();

  // By this we verify the user and sign in right away
  // the moment the user signed up.
  // there is another method that user need to verify his mail first
  // then send the jwt.
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send({ message: "Token sent successfully!", token: token, id: user._id });
};

const signin = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.status(400).send("Please check your email or password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Please check your email or password!");

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send({ message: "Token sent successfully!", token: token, id: user._id });
};

const users = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

// We might add deleteAccount but it will erase all other
// dependancies like wallets, transitions and so

module.exports = { signup, signin, users };
