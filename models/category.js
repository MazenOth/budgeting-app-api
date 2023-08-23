const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const groupEnum = [
  "Required Expense",
  "Up & Comers",
  "Fun & Relax",
  "Investing & Debt Payments",
  "Income",
  "Other",
];

const typeEnum = ["Income", "Expense"];

const Category = mongoose.model(
  "Category",
  new Schema({
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    group: {
      type: String,
      enum: [...groupEnum],
      required: true,
    },
    type: {
      type: String,
      enum: [...typeEnum],
      required: true,
    },
  })
);

function validateCategory(category) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(2).max(50).required(),
    group: Joi.any().valid(...groupEnum).required(),
    type: Joi.any().valid(...typeEnum).required(),
  });
  return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
