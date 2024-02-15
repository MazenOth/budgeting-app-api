const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Transaction = mongoose.model(
  "Transaction",
  new Schema({
    wallet: {
      type: new Schema({
        name: String,
      }),
      required: true,
    },
    user: {
      type: new Schema({
        name: String,
      }),
      required: true,
    },
    category: {
      type: new Schema({
        name: String,
        group: String,
        type: String,
      }),
      required: true,
    },
    amount: {
      type: Number,
      min: 0.001,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  })
);

function validateTransaction(transaction) {
  const schema = Joi.object({
    walletId: Joi.objectId(),
    categoryName: Joi.string().min(2).max(50).required(),
    amount: Joi.number().min(0.001).max(1000000000000).required(),
    transactionDate: Joi.date()
      .min("1-1-1992")
      .max("12-31-2123")
      .default(Date.now),
  });
  return schema.validate(transaction);
}

exports.Transaction = Transaction;
exports.validate = validateTransaction;
