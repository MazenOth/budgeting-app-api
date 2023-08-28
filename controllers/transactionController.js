const { Transaction, validate } = require("../models/transaction");
const { Wallet } = require("../models/wallet");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const _ = require("lodash");

const addTransaction = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const wallet = await Wallet.findById(req.body.walletId);
  if (!wallet) {
    return res.status(400).send("Please check your walletId.");
  }

  const category = await Category.findById(req.body.categoryId).where({
    walletId: req.body.walletId,
  });
  if (!category) {
    return res.status(400).send("Please check your categoryId.");
  }

  let transaction = new Transaction({
    wallet: {
      _id: wallet._id,
      name: wallet.name,
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
  let transaction = await Transaction.findById(req.params.id);
  if (!transaction)
    return res.status(400).send("Please check your transactionId");
  if (transaction.wallet._id != req.body.walletId)
    return res.status(400).send("Wallet cannot be changed.");
  const wallet = await Wallet.findById(req.body.walletId);
  const category = await Category.findById(req.body.categoryId).where({
    walletId: req.body.walletId,
  });
  if (!category) {
    return res.status(400).send("Please check your categoryId.");
  }
  const oldAmount = transaction.amount;
  transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    {
      wallet: { _id: req.body.walletId, name: wallet.name },
      category: {
        _id: category._id,
        name: category.name,
        group: category.group,
        type: category.type,
      },
      amount: req.body.amount,
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
  let transaction = await Transaction.findOne({ _id: req.params.id });
  if (!transaction) {
    return res.status(400).send("Please check your transaction id.");
  }
  const wallet = await Wallet.findById(transaction.wallet._id);
  transaction = await Transaction.findByIdAndDelete(req.params.id);

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

module.exports = { addTransaction, editTransaction, deleteTransaction };
