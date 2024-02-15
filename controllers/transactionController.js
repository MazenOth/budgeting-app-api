const { Transaction, validate } = require("../models/transaction");
const { Wallet } = require("../models/wallet");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const _ = require("lodash");

const addTransaction = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const wallet = await Wallet.findById(req.params.walletId);
  if (!wallet) {
    return res.status(400).send("Please check your walletId.");
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  const category = await Category.findOne({ name: req.body.categoryName }).where({
    walletId: req.params.walletId,
  });
  if (!category) {
    return res.status(400).send("Please check your category name.");
  }

  let transaction = new Transaction({
    wallet: {
      _id: wallet._id,
      name: wallet.name,
    },
    user: {
      _id: user._id,
      name: user.name,
    },
    category: {
      _id: category._id,
      name: category.name,
      group: category.group,
      type: category.type,
    },
    amount: req.body.amount,
  });

  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const result = await transaction.save();
      var newBalance = wallet.balance - transaction.amount;
      wallet.balance = newBalance;
      wallet.save();
      res.send(result);
    });

    session.endSession();
    console.log("Transaction succeeded.");
  } catch (error) {
    console.log("transaction error", error.message);
  }
};

const editTransaction = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction)
    return res.status(400).send("Please check your transactionId");
  if (transaction.wallet._id != req.params.walletId)
    return res.status(400).send("Wallet cannot be changed.");
  const wallet = await Wallet.findById(req.params.walletId);
  const category = await Category.findById(req.params.categoryId).where({
    walletId: req.params.walletId,
  });
  if (!category) {
    return res.status(400).send("Please check your categoryId.");
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  const oldAmount = transaction.amount;
  transaction = await Transaction.findByIdAndUpdate(
    req.params.transactionId,
    {
      wallet: { _id: req.params.walletId, name: wallet.name },
      user: { _id: user._id, name: user.name },
      category: {
        _id: category._id,
        name: category.name,
        group: category.group,
        type: category.type,
      },
      amount: req.body.amount,
      transactionDate: req.body.transactionDate,
    },
    { new: true }
  );

  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      var newBalance = wallet.balance - (transaction.amount - oldAmount);
      wallet.balance = newBalance;
      wallet.save();
      res.send(transaction);
    });

    session.endSession();
    console.log("Transaction Updated.");
  } catch (error) {
    console.log("transaction error", error.message);
  }
};

const deleteTransaction = async (req, res) => {
  let transaction = await Transaction.findOne({
    _id: req.params.transactionId,
  });
  if (!transaction) {
    return res.status(400).send("Please check your transaction id.");
  }
  const wallet = await Wallet.findById(transaction.wallet._id);
  transaction = await Transaction.findByIdAndDelete(req.params.transactionId);

  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      var newBalance = wallet.balance + transaction.amount;
      wallet.balance = newBalance;
      wallet.save();
      res.send(transaction);
    });

    session.endSession();
    console.log("Transaction Deleted.");
  } catch (error) {
    console.log("transaction error", error.message);
  }
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().where({
    "wallet._id": req.params.walletId,
  });
  res.send(transactions);
};

module.exports = {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactions,
};
