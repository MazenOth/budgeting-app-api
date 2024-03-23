const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { Wallet } = require("../models/wallet");
const { Category } = require("../models/category");
const { Transaction } = require("../models/transaction");

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
  res.header("x-auth-token", token).send({
    message: "Token sent successfully!",
    token: token,
    id: user._id,
    email: user.email,
    name: user.name,
  });
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

  let wallet = await Wallet.findOne({ userId: user._id });

  if (!wallet) {
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      message: "Token sent successfully!",
      token: token,
      id: user._id,
      email: user.email,
      name: user.name,
      walletId: "",
    });
  } else {
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      message: "Token sent successfully!",
      token: token,
      id: user._id,
      email: user.email,
      name: user.name,
      walletId: wallet._id,
    });
  }
};

const users = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const deleteUser = async (req, res) => {
  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  user = await User.findByIdAndDelete(req.params.userId);
  let wallet = await Wallet.deleteMany({ userId: req.params.userId });
  let category = await Category.deleteMany({ userId: req.params.userId });
  let transaction = await Transaction.deleteMany({
    "user._id": req.params.userId,
  });

  res.send("Erased.");
};

module.exports = { signup, signin, users, deleteUser };
