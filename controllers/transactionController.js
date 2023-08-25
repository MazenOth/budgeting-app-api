const { Transaction, validate } = require("../models/transaction");
const { Wallet } = require("../models/wallet");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

const addTransaction = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const wallet = await Wallet.findById(req.body.walletId);
  if (!wallet) {
    return res.status(400).send("Please check your walletId.");
  }

  const category = await Category.findById(req.body.categoryId).where({ walletId: req.body.walletId});
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

module.exports = { addTransaction };
