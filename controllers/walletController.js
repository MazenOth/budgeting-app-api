const { Wallet, validate } = require("../models/wallet");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const _ = require("lodash");

const addWallet = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let wallet = await Wallet.findOne({ name: req.body.name }).where({
    userId: req.params.id,
  });
  if (wallet) {
    return res.status(400).send("This wallet name already exists.");
  }
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  wallet = new Wallet({
    userId: req.params.id,
    name: req.body.name,
    balance: req.body.balance,
    currency: req.body.currency,
  });
  wallet = await wallet.save();

  await Category.insertMany([
    {
      walletId: wallet._id,
      userId: user._id,
      name: "Transportation",
      group: "Required Expense",
      type: "Expense",
    },
    {
      walletId: wallet._id,
      userId: user._id,
      name: "Education",
      group: "Up & Comers",
      type: "Expense",
    },
    {
      walletId: wallet._id,
      userId: user._id,
      name: "Streaming Service",
      group: "Fun & Relax",
      type: "Expense",
    },
    {
      walletId: wallet._id,
      userId: user._id,
      name: "Salary",
      group: "Income",
      type: "Income",
    },
  ]);

  res.send(wallet);
};

const editWallet = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let wallet = await Wallet.findOne({ userId: req.params.userId }).where({
    _id: req.params.walletId,
  });
  if (!wallet) {
    return res.status(400).send("Please check your walletId or userId.");
  }
  wallet = await Wallet.findOne({ name: req.body.name }).where({
    userId: req.params.userId,
  });
  if (wallet) {
    return res.status(400).send("This wallet name already exists.");
  }
  wallet = await Wallet.findByIdAndUpdate(
    req.params.walletId,
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

  let hasWallets = await Wallet.findOne({ userId: wallet.userId });

  if (hasWallets) {
    res.send({ hasWallet: true });
  } else {
    res.send({ hasWallet: false });
  }
};

const getWallets = async (req, res) => {
  const wallets = await Wallet.find({}, { name: 1 }).where({
    userId: req.params.id,
  });
  res.send(wallets);
};

module.exports = { addWallet, editWallet, deleteWallet, getWallets };
