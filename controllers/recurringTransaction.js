const {
  RecurringTransaction,
  validate,
} = require('../models/recurringTransaction');
const { Wallet } = require('../models/wallet');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const _ = require('lodash');

const addRecurring = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const wallet = await Wallet.findById(req.params.walletId);
  if (!wallet) {
    return res.status(400).send('Please check your walletId.');
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).send('Please check your userId.');
  }
  const category = await Category.findById(req.body.categoryId).where({
    walletId: req.params.walletId,
  });
  if (!category) {
    return res.status(400).send('Please check your category id.');
  }

  let recurringTransaction = new RecurringTransaction({
    wallet: {
      _id: wallet._id,
    },
    user: {
      _id: user._id,
    },
    category: {
      _id: category._id,
    },
    amount: req.body.amount,
    startDate: req.body.startDate,
    frequencyType: req.body.frequencyType,
    nextOccurence: req.body.startDate,
  });
  recurringTransaction = await recurringTransaction.save();
  res.send(recurringTransaction);
};

module.exports = {
  addRecurring,
};
