const { Transaction, validate } = require("../models/transaction");
const { Wallet } = require("../models/wallet");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const _ = require("lodash");
const schedule = require("node-schedule");

const addRecurring = async (req, res) => {
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
  const category = await Category.findOne({
    name: req.body.categoryName,
  }).where({
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
    transactionDate: req.body.transactionDate,
    recurring: true,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    frequency: req.body.frequency,
    frequencyType: req.body.frequencyType,
  });

  const job = schedule.scheduleJob(
    {
      start: transaction.startDate,
      end: transaction.endDate,
      rule: "*/1 * * * * *",
    },
    async function () {
      try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
          const result = await transaction.save();
          if (transaction.category.type === "Expense") {
            var newBalance = wallet.balance - transaction.amount;
            wallet.balance = newBalance;
          } else {
            var newBalance = wallet.balance + transaction.amount;
            wallet.balance = newBalance;
          }
          wallet.save();
          res.send(result);
        });

        session.endSession();
        console.log("Transaction succeeded.");
      } catch (error) {
        console.log("transaction error: ", error.message);
      }
    }
  );
};

module.exports = {
  addRecurring,
};
