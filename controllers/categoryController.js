const { Category, validate } = require("../models/category");
const { Wallet } = require("../models/wallet");
const { User } = require("../models/user");
const _ = require("lodash");

const addCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const wallet = await Wallet.findOne({ _id: req.params.walletId });
  if (!wallet) {
    return res.status(400).send("Please check your walletId.");
  }
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  let category = await Category.findOne({ name: req.body.name }).where({
    walletId: req.params.walletId,
  });
  if (category) {
    return res.status(400).send("This category name already exists.");
  }
  category = new Category({
    walletId: req.params.walletId,
    userId: req.params.userId,
    name: req.body.name,
    group: req.body.group,
    type: req.body.type,
  });
  category = await category.save();
  res.send(category);
};

const editCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let category = await Category.findOne({
    walletId: req.params.walletId,
  }).where({
    _id: req.params.categoryId,
  });
  if (!category) {
    return res.status(400).send("Please check your categoryId or walletId.");
  }
  category = await Category.findOne({ name: req.body.name }).where({
    walletId: req.params.walletId,
  });
  if (category) {
    return res.status(400).send("This category name already exists.");
  }
  category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    _.pick(req.body, ["name", "group", "type"]),
    { new: true }
  );

  res.send(category);
};

const deleteCategory = async (req, res) => {
  let category = await Category.findOne({ _id: req.params.categoryId });
  if (!category) {
    return res.status(400).send("Please check your category id.");
  }
  category = await Category.findByIdAndDelete(req.params.categoryId);
  res.send(category);
};

const getCategories = async (req, res) => {
  const categories = await Category.find({}, { name: 1 }).where({
    walletId: req.params.walletId,
  });
  res.send(categories);
};

module.exports = { addCategory, editCategory, deleteCategory, getCategories };
