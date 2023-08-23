const { Category, validate } = require("../models/category");
const { Wallet } = require("../models/wallet");
const _ = require("lodash");

const addCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const wallet = await Wallet.findOne({ _id: req.body.walletId });
  if (!wallet) {
    return res.status(400).send("Please check your walletId.");
  }
  let category = await Category.findOne({ name: req.body.name }).where({
    walletId: req.body.walletId,
  });
  if (category) {
    return res.status(400).send("This category name already exists.");
  }
  category = new Category(
    _.pick(req.body, ["walletId", "name", "group", "type"])
  );
  category = await category.save();
  res.send(category);
};

const editCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let category = await Category.findOne({ walletId: req.body.walletId }).where({
    _id: req.params.id,
  });
  if (!category) {
    return res.status(400).send("Please check your categoryId or walletId.");
  }
  category = await Category.findOne({ name: req.body.name }).where({
    walletId: req.body.walletId,
  });
  if (category) {
    return res.status(400).send("This category name already exists.");
  }
  category = await Category.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["name", "group", "type"]),
    { new: true }
  );

  res.send(category);
};

const deleteCategory = async (req, res) => {
  let category = await Category.findOne({ _id: req.params.id });
  if (!category) {
    return res.status(400).send("Please check your category id.");
  }
  category = await Category.findByIdAndDelete(req.params.id);
  res.send(category);
};

module.exports = { addCategory, editCategory, deleteCategory };
