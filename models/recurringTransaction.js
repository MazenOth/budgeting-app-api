const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const frequencyEnum = ["daily", "weekly", "monthly", "yearly"];

const today = new Date(Date.now()).toLocaleString();

const RecurringTransaction = mongoose.model(
  "RecurringTransaction",
  new Schema({
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    frequencyType: {
      type: String,
      enum: [...frequencyEnum],
      default: "daily",
      required: true,
    },
  })
);

function validateRecurringTransaction(recurringTransaction) {
  const schema = Joi.object({
    walletId: Joi.objectId(),
    categoryId: Joi.objectId(),
    amount: Joi.number().min(0.001).max(1000000000000).required(),
    transactionDate: Joi.date()
      .min("1-1-1992")
      .max("12-31-2123")
      .default(today),
    startDate: Joi.date().min(today).max("12-31-2123").default(today),
    frequencyType: Joi.any()
      .valid(...frequencyEnum)
      .required(),
  });
  return schema.validate(recurringTransaction);
}

exports.RecurringTransaction = RecurringTransaction;
exports.validate = validateRecurringTransaction;
