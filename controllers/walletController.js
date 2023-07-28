const { Wallet, validate } = require("../models/wallet");
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
  wallet = new Wallet(
    _.pick(req.body, ["userId", "name", "balance", "currency"])
  );
  wallet = await wallet.save();
  res.send(wallet);
};

const editWallet = async (req, res) => {
  let wallet = await Wallet.findOne({ _id: req.params.id });
  if (!wallet) {
    return res.status(400).send("Please check your wallet id.");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  wallet = await Wallet.findOne({ name: req.body.name }).where({
    userId: req.body.userId,
  });
  if (wallet) {
    return res.status(400).send("This wallet name already exists.");
  }
  wallet = await Wallet.findOne({ userId: req.body.userId });
  if (!wallet) {
    return res.status(400).send("Please check your userId.");
  }
  wallet = await Wallet.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["name", "balance", "currency"]),
    { new: true }
  );

  res.send(wallet);
};

module.exports = { addWallet, editWallet };
