const { Wallet, validate } = require("../models/wallet");
const { User } = require("../models/user");
const _ = require("lodash");

const addWallet = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let wallet = await Wallet.findOne({ name: req.body.name }).where({
    userId: req.body.userId,
  });
  if (wallet) {
    return res.status(400).send("This wallet name already exists.");
  }
  const user = await User.findOne({ _id: req.body.userId });
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  wallet = new Wallet(
    _.pick(req.body, ["userId", "name", "balance", "currency"])
  );
  wallet = await wallet.save();
  res.send(wallet);
};

const editWallet = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let wallet = await Wallet.findOne({ userId: req.body.userId }).where({
    _id: req.params.id,
  });
  if (!wallet) {
    return res.status(400).send("Please check your walletId or userId.");
  }
  wallet = await Wallet.findOne({ name: req.body.name }).where({
    userId: req.body.userId,
  });
  if (wallet) {
    return res.status(400).send("This wallet name already exists.");
  }
  wallet = await Wallet.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["name", "balance", "currency"]),
    { new: true }
  );

  res.send(wallet);
};

const deleteWallet = async (req, res) => {
  let wallet = await Wallet.findOne({ _id: req.params.id });
  if (!wallet) {
    return res.status(400).send("Please check your wallet id.");
  }
  wallet = await Wallet.findByIdAndDelete(req.params.id);
  res.send(wallet);
};

module.exports = { addWallet, editWallet, deleteWallet };
